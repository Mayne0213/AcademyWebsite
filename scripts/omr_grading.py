import json
import sys
import cv2
import numpy as np
from math import hypot

# --- 상수 및 설정 ---
ROI = (1457, 366, 1617, 1967)  # (x, y, w, h)
X_GAP, Y_GAP = 60, 100

# --- 함수 정의 ---

def load_image(image_path):
    """이미지 로드 및 크기 반환"""
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Image not found at: {image_path}")
    return img, img.shape[:2]

def create_mask(h, w, roi):
    """관심영역 마스크 생성"""
    mask = np.zeros((h, w), dtype=np.uint8)
    x, y, w_roi, h_roi = roi
    mask[y:y+h_roi, x:x+w_roi] = 255
    return mask

def extract_markings(img, mask, lower=(0, 0, 0), upper=(60, 60, 60)):
    """색상 임계값 기반 마킹 추출 및 모폴로지 처리"""
    thresh = cv2.inRange(img, lower, upper)
    masked = cv2.bitwise_and(thresh, thresh, mask=mask)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    morph = cv2.morphologyEx(masked, cv2.MORPH_CLOSE, kernel)
    morph = cv2.morphologyEx(morph, cv2.MORPH_OPEN, kernel)
    return morph

def find_centers(morph):
    """컨투어 중심점 계산"""
    contours = cv2.findContours(morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    contours = contours[0] if len(contours) == 2 else contours[1]

    centers = []
    for cntr in contours:
        M = cv2.moments(cntr)
        if M["m00"] == 0:
            continue
        cx = int(M["m10"] / M["m00"])
        cy = int(M["m01"] / M["m00"])
        centers.append((cx, cy))
    return centers

def define_answer_positions():
    """정답지 선택지 좌표 계산"""
    positions = {}
    for q in range(1, 46):
        positions[q] = {}
        # 3개 영역별 시작점
        if q == 1:
            start_x, start_y = 1457+27, 366+36
        elif q == 21:
            start_x, start_y = 2114+27, 366+36
        elif q == 41:
            start_x, start_y = 2774+27, 366+36

        for choice in range(1, 6):
            x = start_x + (choice - 1) * X_GAP
            if 1 <= q <= 20:
                y = start_y + (q - 1) * Y_GAP
            elif 21 <= q <= 40:
                y = start_y + (q - 21) * Y_GAP
            else:
                y = start_y + (q - 41) * Y_GAP

            positions[q][str(choice)] = (x, y)
    return positions

def estimate_selected_answers(centers, answer_positions, tolerance=30):
    """학생 답안 선택 좌표 추정"""
    selected = {}
    for q_num, choices in answer_positions.items():
        matches = []
        for choice, coord in choices.items():
            for center in centers:
                dist = hypot(center[0] - coord[0], center[1] - coord[1])
                if dist < tolerance:
                    matches.append(choice)

        if len(matches) == 1:
            selected[q_num] = matches[0]
        elif len(matches) > 1:
            selected[q_num] = "중복"
        else:
            selected[q_num] = "미기입"
    return selected

def calculate_total_score(selected_answers, correct_answers, question_scores):
    """총점 계산"""
    total = 0
    
    for q_num, correct_answer in correct_answers.items():
        try:
            q_num_int = int(q_num)
            score = question_scores.get(q_num, 0)
            # selected_answers는 정수 키를 사용하므로 q_num_int로 접근
            student_answer = selected_answers.get(q_num_int, "미기입")
            
            if student_answer == correct_answer:
                total += score
                
        except (ValueError, TypeError) as e:
            continue
    
    return total

def calculate_grade(total_score):
    """등급 계산"""
    if total_score >= 90:
        return 1
    elif total_score >= 80:
        return 2
    elif total_score >= 70:
        return 3
    elif total_score >= 65:
        return 4
    elif total_score >= 60:
        return 5
    elif total_score >= 55:
        return 6
    elif total_score >= 50:
        return 7
    elif total_score >= 40:
        return 8
    else:
        return 9

def create_results_array(selected_answers, correct_answers, question_scores, question_types):
    """결과 배열 생성"""
    results = []
    
    # correct_answers의 키를 기준으로 결과 생성 (숫자 정렬)
    for q_num in sorted(correct_answers.keys(), key=lambda x: int(x)):
        try:
            q_num_int = int(q_num)
            student_answer = selected_answers.get(q_num_int, "미기입")
            correct_answer = correct_answers[q_num]
            score = question_scores.get(q_num, 0)
            question_type = question_types.get(q_num, "기타")
            
            earned_score = score if student_answer == correct_answer else 0
            
            results.append({
                "questionNumber": q_num_int,
                "studentAnswer": str(student_answer),
                "correctAnswer": correct_answer,
                "score": score,
                "earnedScore": earned_score,
                "questionType": question_type
            })
        except (ValueError, TypeError) as e:
            continue
    
    return results

def grade_omr(image_path, correct_answers, question_scores, question_types):
    """OMR 채점 메인 함수"""
    try:
        # 이미지 로드
        img, (h, w) = load_image(image_path)
        
        # 관심영역 마스크 생성 및 적용
        mask = create_mask(h, w, ROI)
        morph = extract_markings(img, mask)
        
        # 마킹 중심 좌표 찾기
        centers = find_centers(morph)
        
        # 답안 위치 계산
        answer_positions = define_answer_positions()
        
        # 학생 답안 추정
        selected_answers = estimate_selected_answers(centers, answer_positions)
        
        # 총점 계산
        total_score = calculate_total_score(selected_answers, correct_answers, question_scores)
        
        # 등급 계산
        grade = calculate_grade(total_score)
        
        # 결과 배열 생성
        results = create_results_array(selected_answers, correct_answers, question_scores, question_types)
        
        final_result = {
            "totalScore": total_score,
            "grade": grade,
            "results": results
        }
        
        return final_result
        
    except Exception as e:
        raise Exception(f"OMR 채점 실패: {str(e)}")

# --- 메인 실행 부분 ---

if __name__ == "__main__":
    try:
        # 커맨드라인 인자 파싱
        if len(sys.argv) != 5:
            print(json.dumps({"error": "인자 개수가 올바르지 않습니다. 이미지경로, 정답, 배점, 문제유형이 필요합니다."}))
            sys.exit(1)
        
        image_path = sys.argv[1]
        correct_answers = json.loads(sys.argv[2])
        question_scores = json.loads(sys.argv[3])
        question_types = json.loads(sys.argv[4])
        
        # OMR 채점 실행
        result = grade_omr(image_path, correct_answers, question_scores, question_types)
        
        # JSON 결과 출력 (디버그 메시지 없이)
        print(json.dumps(result, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
