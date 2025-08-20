import json
import sys
import cv2
import numpy as np
from math import hypot

# --- 상수 및 설정 ---
TARGET_WIDTH = 2480
TARGET_HEIGHT = 3508



# --- 함수 정의 ---

def load_image(image_path):
    """이미지 로드 및 크기 반환"""
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Image not found at: {image_path}")
    return img, img.shape[:2]

def resize_image_to_target(img, target_width=TARGET_WIDTH, target_height=TARGET_HEIGHT):
    """이미지를 타겟 크기로 리사이징 (비율 유지)"""
    h, w = img.shape[:2]

    # 현재 이미지가 이미 타겟 크기인 경우
    if w == target_width and h == target_height:
        return img, 1.0, 1.0

    # 스케일 팩터 계산
    scale_x = target_width / w
    scale_y = target_height / h

    # 비율을 유지하면서 리사이징
    new_width = int(w * scale_x)
    new_height = int(h * scale_y)

    # INTER_CUBIC을 사용하여 더 나은 품질로 리사이징
    resized_img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_CUBIC)

    return resized_img, scale_x, scale_y

def gamma_correction(img, gamma=0.7):
    """감마 보정으로 밝기 곡선 조정"""
    inv_gamma = 1.0 / gamma
    table = np.array([((i / 255.0) ** inv_gamma) * 255 for i in np.arange(0, 256)]).astype("uint8")
    return cv2.LUT(img, table)

def unsharp_mask(img, kernel_size=(5, 5), sigma=1.0, amount=1.0):
    """언샤프 마스킹으로 경계 선명화"""
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    blurred = cv2.GaussianBlur(img, kernel_size, sigma)
    sharpened = cv2.addWeighted(img, 1.0 + amount, blurred, -amount, 0)
    return sharpened

def preprocess_omr_image(img):
    """OMR 이미지 전처리 강화"""
    # 1. 가우시안 블러로 노이즈 제거
    denoised = cv2.GaussianBlur(img, (3, 3), 0)

    # 2. 감마 보정으로 밝기 조절 (어두운 마킹을 더 진하게)
    gamma_corrected = gamma_correction(denoised, gamma=0.7)

    # 3. 그레이스케일 변환
    if len(gamma_corrected.shape) == 3:
        gray = cv2.cvtColor(gamma_corrected, cv2.COLOR_BGR2GRAY)
    else:
        gray = gamma_corrected

    # 4. CLAHE로 지역적 대비 향상
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)

    # 5. 언샤프 마스킹으로 경계 선명화
    sharpened = unsharp_mask(enhanced, amount=0.8)

    # 6. BGR로 다시 변환 (기존 코드 호환성을 위해)
    result = cv2.cvtColor(sharpened, cv2.COLOR_GRAY2BGR)

    return result





def calculate_marking_density(img, x, y, width=40, height=40):
    """특정 좌표 주변 영역의 마킹 밀도 계산"""
    # 영역 경계 확인
    h, w = img.shape[:2]
    x1 = max(0, x - width//2)
    y1 = max(0, y - height//2)
    x2 = min(w, x + width//2)
    y2 = min(h, y + height//2)

    # 해당 영역 추출
    region = img[y1:y2, x1:x2]
    if region.size == 0:
        return 0.0

    # 그레이스케일 변환 (필요시)
    if len(region.shape) == 3:
        region = cv2.cvtColor(region, cv2.COLOR_BGR2GRAY)

    # 평균 어둠 정도 (0~255 범위에서 낮을수록 어둡다)
    avg_darkness = 255 - np.mean(region)

    # 어두운 픽셀 비율 (임계값을 조정: 180 이하)
    dark_pixels = np.sum(region < 180)  # 200에서 180으로 다시 조정 (더 엄격하게)
    total_pixels = region.size
    dark_ratio = dark_pixels / total_pixels

    # 중간 어두운 픽셀 비율 (실제 마킹 범위)
    medium_dark_pixels = np.sum(region < 160)  # 160 이하만 (실제 마킹)
    medium_dark_ratio = medium_dark_pixels / total_pixels

    # 매우 어두운 픽셀 비율 (확실한 마킹)
    very_dark_pixels = np.sum(region < 120)
    very_dark_ratio = very_dark_pixels / total_pixels

    # 밀도 점수: 매우 어두운 픽셀을 더 중요하게 (실제 마킹 우선)
    density_score = (avg_darkness / 255.0) * 0.2 + dark_ratio * 0.2 + medium_dark_ratio * 0.4 + very_dark_ratio * 0.2

    return density_score



upperValueSquare = 120
def find_top_black_rectangles(img):
    """상단 검은색 사각형들을 찾아서 좌표 반환"""
    # 그레이스케일 변환
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 검은색 영역 찾기 (임계값 조정)
    _, thresh = cv2.threshold(gray, upperValueSquare, 255, cv2.THRESH_BINARY_INV)

    # 모폴로지 연산으로 사각형 내부 구멍 메우기 및 노이즈 제거
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    # MORPH_CLOSE: 구멍을 메우고 분할된 영역을 연결
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    # MORPH_OPEN: 작은 노이즈 제거
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

    # 컨투어 찾기
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 상단 영역의 사각형들만 필터링 (이미지 상단 5% 영역)
    top_rectangles = []
    img_height = img.shape[0]
    top_area_threshold = img_height * 0.15

    # 디버깅용 이미지들 생성
    debug_img = img.copy()
    thresh_colored = cv2.cvtColor(thresh, cv2.COLOR_GRAY2BGR)

    # 모든 컨투어를 초록색으로 표시
    cv2.drawContours(debug_img, contours, -1, (0, 255, 0), 2)

    # 상단 영역 임계선을 빨간색으로 표시
    cv2.line(debug_img, (0, int(top_area_threshold)), (img.shape[1], int(top_area_threshold)), (0, 0, 255), 2)

    for i, contour in enumerate(contours):
        # 컨투어의 경계 사각형
        x, y, w, h = cv2.boundingRect(contour)
        area = w * h

        # 상단 영역에 있고, 적절한 크기인 사각형만 선택
        if (y < top_area_threshold and
            w > 10 and h > 10 and  # 너무 작은 사각형 제외 (20에서 10으로 완화)
            w < 300 and h < 300):  # 너무 큰 사각형 제외 (200에서 300으로 완화)

            # 사각형의 중심점과 크기 저장
            center_x = x + w // 2
            center_y = y + h // 2
            top_rectangles.append({
                'center': (center_x, center_y),
                'bbox': (x, y, w, h),
                'area': w * h
            })
        else:
            # 필터링된 사각형을 빨간색으로 표시
            cv2.rectangle(debug_img, (x, y), (x + w, y + h), (0, 0, 255), 1)

    # 노이즈 제거를 위한 Y축 정렬 후 선택
    # Y축 정렬 → 가장 위쪽 23개 선택 (상단 바코드들)
    top_rectangles.sort(key=lambda x: x['center'][1])  # Y축 오름차순 (위에서 아래로)
    selected_rectangles = top_rectangles[:23]  # 가장 위쪽 23개
    selected_rectangles.sort(key=lambda x: x['center'][0])  # 최종 X축 정렬 (왼쪽에서 오른쪽으로)

    # 선택된 23 사각형을 파란색으로 표시 (디버깅 이미지에 추가)
    for i, rect in enumerate(selected_rectangles):
        x, y, w, h = rect['bbox']
        cv2.rectangle(debug_img, (x, y), (x + w, y + h), (255, 0, 0), 3)
        cv2.putText(debug_img, f"Selected{i+1}", (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

    return selected_rectangles

def find_side_black_rectangles(img):
    """좌우측 검은색 사각형들을 찾아서 좌표 반환 (Y축 계산용)"""
    # 그레이스케일 변환
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 검은색 영역 찾기 (임계값 조정)
    _, thresh = cv2.threshold(gray, upperValueSquare, 255, cv2.THRESH_BINARY_INV)

    # 모폴로지 연산으로 사각형 내부 구멍 메우기 및 노이즈 제거
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    # MORPH_CLOSE: 구멍을 메우고 분할된 영역을 연결
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    # MORPH_OPEN: 작은 노이즈 제거
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

    # 컨투어 찾기
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    img_height, img_width = img.shape[:2]

    # 좌측과 우측 영역 정의
    left_area_threshold = img_width * 0.15  # 좌측 5% 영역 (전화번호용)
    right_area_start = img_width * 0.85     # 우측 5% 영역 시작점 (답안용)

    left_rectangles = []
    right_rectangles = []

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        center_x = x + w // 2
        center_y = y + h // 2

        # 적절한 크기인 사각형만 선택
        if (w > 20 and h > 20 and
            w < 70 and h < 70):

            # 좌측 영역의 사각형들 (전화번호용)
            if center_x < left_area_threshold:
                left_rectangles.append({
                    'center': (center_x, center_y),
                    'bbox': (x, y, w, h),
                    'area': w * h
                })

            # 우측 영역의 사각형들 (선지용)
            elif center_x > right_area_start:
                right_rectangles.append({
                    'center': (center_x, center_y),
                    'bbox': (x, y, w, h),
                    'area': w * h
                })

    # 노이즈 제거를 위한 X축 정렬 후 선택
    # 좌측: X축 정렬 → 앞쪽 10개 선택 (가장 왼쪽 바코드들)
    left_rectangles.sort(key=lambda x: x['center'][0])  # X축 오름차순
    left_selected = left_rectangles[:10]  # 가장 왼쪽 10개
    left_selected.sort(key=lambda x: x['center'][1])  # 최종 Y축 정렬

    # 우측: X축 정렬 → 뒤쪽 20개 선택 (가장 오른쪽 바코드들)
    right_rectangles.sort(key=lambda x: x['center'][0])  # X축 오름차순
    right_selected = right_rectangles[-20:] if len(right_rectangles) >= 20 else right_rectangles  # 가장 오른쪽 20개
    right_selected.sort(key=lambda x: x['center'][1])  # 최종 Y축 정렬

    # print(f"선택된 좌측 사각형: {len(left_selected)}개")

    return left_selected, right_selected

def define_phone_positions(img_width, img_height, top_rectangles, left_rectangles):
    """전화번호 전용 위치 계산 (1-8번 사각형, 1-10번 숫자 자리)"""
    phone_positions = {}

    # 1-8번 사각형: 전화번호 자리수 (X축)
    for rect_index in range(8):
        if rect_index < len(top_rectangles):
            rect_center_x = top_rectangles[rect_index]['center'][0]
            digit_position = rect_index + 1  # 1-8번째 자리

            # 0-9번 숫자 (Y축: 왼쪽 네모 사용)
            if len(left_rectangles) >= 10:
                phone_positions[digit_position] = {}
                for digit in range(10):  # 0-9
                    if digit < len(left_rectangles):
                        y = left_rectangles[digit]['center'][1]
                        phone_positions[digit_position][str(digit)] = (rect_center_x, y)

    return phone_positions

def define_answer_positions(img_width, img_height, top_rectangles, left_rectangles, right_rectangles):
    """답안 전용 위치 계산 (9-23번 사각형, 1-45번 문제)"""
    positions = {}

    # 9-13번 사각형: 1-20번 문제의 1-5번 선지
    for rect_index in range(8, 13):  # 9-13번 사각형
        if rect_index < len(top_rectangles):
            rect_center_x = top_rectangles[rect_index]['center'][0]
            choice_num = rect_index - 7  # 1, 2, 3, 4, 5번 선지

            # 1-20번 문제
            if len(right_rectangles) >= 20:
                for q in range(1, 21):  # 1-20번 문제
                    if q not in positions:
                        positions[q] = {}

                    question_index = q - 1  # 1번 문제 -> 0번 인덱스
                    if question_index < len(right_rectangles):
                        y = right_rectangles[question_index]['center'][1]
                        positions[q][str(choice_num)] = (rect_center_x, y)

    # 14-18번 사각형: 21-40번 문제의 1-5번 선지
    for rect_index in range(13, 18):  # 14-18번 사각형
        if rect_index < len(top_rectangles):
            rect_center_x = top_rectangles[rect_index]['center'][0]
            choice_num = rect_index - 12  # 1, 2, 3, 4, 5번 선지

            # 21-40번 문제
            if len(right_rectangles) >= 20:
                for q in range(21, 41):  # 21-40번 문제
                    if q not in positions:
                        positions[q] = {}

                    question_index = q - 21  # 21번 문제 -> 0번 인덱스
                    if question_index < len(right_rectangles):
                        y = right_rectangles[question_index]['center'][1]
                        positions[q][str(choice_num)] = (rect_center_x, y)

    # 19-23번 사각형: 41-45번 문제의 1-5번 선지
    for rect_index in range(18, 23):  # 19-23번 사각형
        if rect_index < len(top_rectangles):
            rect_center_x = top_rectangles[rect_index]['center'][0]
            choice_num = rect_index - 17  # 1, 2, 3, 4, 5번 선지

            # 41-45번 문제
            if len(right_rectangles) >= 5:
                for q in range(41, 46):  # 41-45번 문제
                    if q not in positions:
                        positions[q] = {}

                    question_index = q - 41  # 41번 문제 -> 0번 인덱스
                    if question_index < len(right_rectangles):
                        y = right_rectangles[question_index]['center'][1]
                        positions[q][str(choice_num)] = (rect_center_x, y)

    return positions

def estimate_phone_number_with_density(img, phone_positions, min_density=0.05):
    """밀도 기반 전화번호 추정 (답안과 동일한 로직 적용)"""
    phone_selected = {}

    # 각 자리별로 밀도가 가장 높은 숫자 찾기
    for digit_pos, digit_choices in phone_positions.items():
        if not digit_choices:
            phone_selected[digit_pos] = "0"
            continue

        # 각 숫자(0-9)의 밀도 계산
        digit_densities = {}
        for digit, coord in digit_choices.items():
            x, y = coord
            density = calculate_marking_density(img, x, y)
            digit_densities[digit] = density

        # 밀도가 높은 순으로 정렬
        sorted_digits = sorted(digit_densities.items(), key=lambda x: x[1], reverse=True)

        # 답안과 동일한 로직 적용
        if len(sorted_digits) >= 2:
            highest_digit, highest_density = sorted_digits[0]
            second_digit, second_density = sorted_digits[1]

            # 1. 최고 밀도가 최소 임계값을 넘고
            # 2. 최고 밀도가 두 번째보다 충분히 높은 경우만 선택
            if (highest_density >= min_density and
                highest_density > second_density + 0.1):  # 10% 이상 차이
                phone_selected[digit_pos] = highest_digit
            else:
                # 애매한 경우 더 엄격한 기준 적용
                if highest_density >= min_density + 0.1:  # 더 높은 임계값 요구
                    phone_selected[digit_pos] = highest_digit
                else:
                    phone_selected[digit_pos] = "0"
        elif len(sorted_digits) == 1:
            digit, density = sorted_digits[0]
            if density >= min_density + 0.1:  # 단일 숫자도 더 엄격한 기준
                phone_selected[digit_pos] = digit
            else:
                phone_selected[digit_pos] = "0"
        else:
            phone_selected[digit_pos] = "0"

    return phone_selected

def estimate_selected_answers_with_density(img, answer_positions, min_density=0.1):
    """밀도 기반 답안 추정 (상대적 분석 + 밀도 분석)"""
    selected = {}

    # 모든 답안 문제 처리 (1-45번)
    for q_num, choices in answer_positions.items():
        if not choices:
            selected[str(q_num)] = "무효"
            continue

        # 각 선지의 밀도 계산
        choice_densities = {}
        for choice, coord in choices.items():
            x, y = coord
            density = calculate_marking_density(img, x, y)
            choice_densities[choice] = density

        # 밀도가 높은 순으로 정렬
        sorted_choices = sorted(choice_densities.items(), key=lambda x: x[1], reverse=True)

        # 가장 높은 밀도와 두 번째 높은 밀도 비교
        if len(sorted_choices) >= 2:
            highest_choice, highest_density = sorted_choices[0]
            second_choice, second_density = sorted_choices[1]

            # 1. 최고 밀도가 최소 임계값을 넘고
            # 2. 최고 밀도가 두 번째보다 충분히 높은 경우만 선택
            if (highest_density >= min_density and
                highest_density > second_density + 0.1):  # 10% 이상 차이 (더 엄격하게)
                selected[str(q_num)] = highest_choice
            elif highest_density >= 0.35 and second_density >= 0.35:  # 무효 처리 기준 완화
                # 두 선지가 모두 높은 밀도면 무효
                selected[str(q_num)] = "무효"
            else:
                # 애매한 경우 더 엄격한 기준 적용
                if highest_density >= min_density + 0.1:  # 더 높은 임계값 요구
                    selected[str(q_num)] = highest_choice
                else:
                    selected[str(q_num)] = "무효"
        elif len(sorted_choices) == 1:
            choice, density = sorted_choices[0]
            if density >= min_density + 0.1:  # 단일 선지도 더 엄격한 기준
                selected[str(q_num)] = choice
            else:
                selected[str(q_num)] = "무효"
        else:
            selected[str(q_num)] = "무효"

    return selected



def extract_phone_number(phone_selected):
    """전화번호 8자리 추출"""
    phone_digits = []

    # 1번부터 8번까지 자리수에서 전화번호 수집
    for i in range(1, 9):
        if i in phone_selected:
            digit = phone_selected[i]
            # 유효한 숫자인지 확인 (0-9 범위)
            if digit and digit != "무효":
                try:
                    digit_int = int(digit)
                    if 0 <= digit_int <= 9:
                        phone_digits.append(str(digit_int))
                    else:
                        phone_digits.append("0")  # 잘못된 값은 0으로 처리
                except ValueError:
                    phone_digits.append("0")  # 변환 실패시 0으로 처리
            else:
                phone_digits.append("0")  # 무효시 0으로 처리
        else:
            phone_digits.append("0")  # 답안이 없으면 0으로 처리

    # 8자리 전화번호 문자열로 합치기
    phone_number = "".join(phone_digits)
    return phone_number

def calculate_total_score(selected_answers, correct_answers, question_scores):
    """총점 계산 (모든 답안 문제 1-45번 포함)"""
    total = 0
    
    for q_num, correct_answer in correct_answers.items():
        if q_num in selected_answers:
            student_answer = selected_answers[q_num]
            if student_answer == correct_answer:
                score = question_scores.get(q_num, 0)
                total += score
    
    return total

def calculate_grade(total_score):
    """등급 계산 (총점 기준)"""
    if total_score >= 90:
        return 1
    elif total_score >= 85:
        return 2
    elif total_score >= 80:
        return 3
    elif total_score >= 75:
        return 4
    elif total_score >= 70:
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
    """결과 배열 생성 (모든 답안 문제 1-45번 포함)"""
    results = []
    
    # correct_answers의 키를 기준으로 결과 생성 (숫자 정렬)
    for q_num in sorted(correct_answers.keys(), key=lambda x: int(x)):
        try:
            q_num_int = int(q_num)
            student_answer = selected_answers.get(q_num, "무효")  # 문자열 키로 접근
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


        # 이미지 비율 확인 (2480:3508 = 0.7075)
        expected_ratio = TARGET_WIDTH / TARGET_HEIGHT
        actual_ratio = w / h
        ratio_diff = abs(expected_ratio - actual_ratio)
        
        if ratio_diff > 0.01:  # 1% 이상 차이나면 경고
            pass

        # 이미지 리사이징 및 스케일 팩터 계산
        resized_img, scale_x, scale_y = resize_image_to_target(img)
        resized_h, resized_w = resized_img.shape[:2]

        # 이미지 전처리 강화 적용
        preprocessed_img = preprocess_omr_image(resized_img)

        # 디버깅용 이미지 시각화 (전처리된 이미지 기준)
        debug_img = preprocessed_img.copy()




        # 상단 검은색 사각형 찾기 (원본 이미지 사용)
        top_rectangles = find_top_black_rectangles(resized_img)


        # 좌우측 검은색 사각형 찾기 (Y축 계산용, 원본 이미지 사용)
        left_rectangles, right_rectangles = find_side_black_rectangles(resized_img)


        # 전화번호 위치 계산 (1-8번 사각형, 0-9 숫자)
        phone_positions = define_phone_positions(resized_w, resized_h, top_rectangles, left_rectangles)

        # 답안 위치 계산 (9-23번 사각형, 1-45번 문제)
        answer_positions = define_answer_positions(resized_w, resized_h, top_rectangles, left_rectangles, right_rectangles)

        # 디버깅용: 영역 경계선 표시
        # 좌측 영역 경계선 (전화번호용 - 5% 라인)
        left_area_threshold = int(resized_w * 0.15)
        cv2.line(debug_img, (left_area_threshold, 0), (left_area_threshold, resized_h), (0, 255, 255), 3)  # 노란색 세로선
        cv2.putText(debug_img, "", (left_area_threshold + 5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 4)

        # 우측 영역 경계선 (답안용 - 95% 라인)
        right_area_start = int(resized_w * 0.85)
        cv2.line(debug_img, (right_area_start, 0), (right_area_start, resized_h), (0, 225, 255), 3)  # 마젠타 세로선
        cv2.putText(debug_img, "", (right_area_start + 5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 4)



        # 상단 영역 경계선 (5% 라인)
        top_area_threshold = int(resized_h * 0.15)
        cv2.line(debug_img, (0, top_area_threshold), (resized_w, top_area_threshold), (0, 225, 255), 3)  # 빨간색 가로선
        cv2.putText(debug_img, "", (10, top_area_threshold + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 4)

        # 디버깅용: 전화번호 위치를 노란색 원으로 표시 + 밀도값 출력
        print("\n=== 전화번호 위치별 기본 밀도값 ===")
        for digit_pos, digit_choices in phone_positions.items():
            print(f"전화번호 {digit_pos}번째 자리:")
            for digit, coord in digit_choices.items():
                # 현재 좌표의 밀도 계산
                density = calculate_marking_density(preprocessed_img, coord[0], coord[1])
                cv2.circle(debug_img, coord, 8, (255, 0, 0), 2)  # 파란색 원 (전화번호)
                print(f"  숫자 {digit}: 밀도 {density:.4f} (좌표: {coord})")

        # 디버깅용: 모든 답안 위치를 파란색 원으로 표시 + 밀도값 출력
        print("\n=== 답안 위치별 기본 밀도값 ===")
        all_densities = []  # 모든 밀도값 저장
        max_min_diffs = []  # 각 문제별 최대-최소 밀도 차이 저장
        
        for q_num, choices in answer_positions.items():
            print(f"문제 {q_num}번:")
            question_densities = []
            for choice, coord in choices.items():
                # 현재 좌표의 밀도 계산
                density = calculate_marking_density(preprocessed_img, coord[0], coord[1])
                cv2.circle(debug_img, coord, 10, (255, 0, 0), 2)  # 파란색 원 (답안)
                print(f"  선지 {choice}: 밀도 {density:.4f} (좌표: {coord})")
                all_densities.append(density)
                question_densities.append(density)
            
            # 각 문제별 최대-최소 밀도 차이 계산
            if question_densities:
                max_density = max(question_densities)
                min_density = min(question_densities)
                diff = max_density - min_density
                max_min_diffs.append(diff)
                print(f"  → 문제 {q_num}번 밀도 차이: {diff:.4f} (최대: {max_density:.4f}, 최소: {min_density:.4f})")
        
        # 전체 밀도 통계 출력
        if all_densities:
            avg_density = sum(all_densities) / len(all_densities)
            max_overall = max(all_densities)
            min_overall = min(all_densities)
            overall_diff = max_overall - min_overall
            
            print(f"\n=== 전체 밀도 분석 (선지 1~45번) ===")
            print(f"총 선지 개수: {len(all_densities)}개")
            print(f"평균 밀도: {avg_density:.4f}")
            print(f"최대 밀도: {max_overall:.4f}")
            print(f"최소 밀도: {min_overall:.4f}")
            print(f"전체 밀도 차이: {overall_diff:.4f}")
        
        # 문제별 밀도 차이 평균 출력
        if max_min_diffs:
            avg_diff = sum(max_min_diffs) / len(max_min_diffs)
            max_diff = max(max_min_diffs)
            min_diff = min(max_min_diffs)
            
            print(f"\n=== 문제별 밀도 차이 분석 ===")
            print(f"문제별 밀도 차이 평균: {avg_diff:.4f}")
            print(f"문제별 밀도 차이 최대값: {max_diff:.4f}")
            print(f"문제별 밀도 차이 최소값: {min_diff:.4f}")
            print(f"분석된 문제 수: {len(max_min_diffs)}개")

        # 디버깅용: 상단 검은색 사각형들을 표시
        # - 좌표 인식에 사용된 사각형: 파란색 테두리
        # - 사용되지 않은 사각형: 빨간색 테두리
        for i, rect in enumerate(top_rectangles):
            x, y, w, h = rect['bbox']
            if i < 23:  # 사용된 상위 23개 사각형
                cv2.rectangle(debug_img, (x, y), (x + w, y + h), (255, 0, 0), 3)  # 파란색 테두리 (두께 3)
                cv2.putText(debug_img, f"Top{i+1}", (x, y-5),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
            else:  # 사용되지 않은 사각형
                cv2.rectangle(debug_img, (x, y), (x + w, y + h), (0, 0, 255), 2)  # 빨간색 테두리
                cv2.putText(debug_img, f"Unused{i+1}", (x, y-5),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        # 디버깅용: 좌측 사각형들을 표시 (전화번호 Y축용)
        for i, rect in enumerate(left_rectangles):
            x, y, w, h = rect['bbox']
            cv2.rectangle(debug_img, (x, y), (x + w, y + h), (255, 0, 0), 3)  # 노란색 테두리
            cv2.putText(debug_img, f"L{i+1}", (x, y-5),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)

        # 디버깅용: 우측 사각형들을 표시 (선지 Y축용)
        for i, rect in enumerate(right_rectangles):
            x, y, w, h = rect['bbox']
            cv2.rectangle(debug_img, (x, y), (x + w, y + h), (255, 0, 0), 3)  # 청록색 테두리
            cv2.putText(debug_img, f"R{i+1}", (x, y-5),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)

        # 사각형 감지 과정 시각화를 위한 추가 디버깅 이미지들
        gray = cv2.cvtColor(resized_img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY_INV)

        
        # 모든 컨투어를 초록색으로 표시
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contour_img = resized_img.copy()


        # 디버깅용: 모든 답안 위치를 파란색 원으로 표시 (1번부터 45번까지)
        for q_num in range(1, 46):
            if q_num in answer_positions:
                for choice, coord in answer_positions[q_num].items():
                    cv2.circle(debug_img, coord, 12, (255, 0, 0), 2)  # 파란색 원 (답안 위치)

        # 디버깅용: 모든 전화번호 위치를 파란색 원으로 표시 (1-8자리, 0-9숫자)
        for digit_pos, digit_choices in phone_positions.items():
            for digit, coord in digit_choices.items():
                cv2.circle(debug_img, coord, 8, (255, 0, 0), 1)  # 파란색 원 (전화번호 위치)



        # 전화번호 추정 (밀도 기반, 전처리된 이미지 사용)
        phone_selected = estimate_phone_number_with_density(preprocessed_img, phone_positions)
        phone_number = extract_phone_number(phone_selected)

        # 학생 답안 추정 (1-45번 문제) - 밀도 기반 방식, 전처리된 이미지 사용
        selected_answers = estimate_selected_answers_with_density(preprocessed_img, answer_positions)
        
        # 인식된 답안 요약 출력
        print("\n=== 인식된 답안 요약 ===")
        recognized_count = 0
        for q_num, answer in selected_answers.items():
            if answer != "무효":
                recognized_count += 1
                print(f"문제 {q_num}번: 선지 {answer} 인식됨")
        
        if recognized_count == 0:
            print("인식된 답안이 없습니다 (모두 무효)")
        else:
            print(f"\n총 {recognized_count}개 문제에서 답안 인식됨")

        # 학생이 선택한 전화번호를 빨간색 원으로 표시
        for digit_pos, selected_digit in phone_selected.items():
            try:
                if (digit_pos in phone_positions and
                    selected_digit != "0" and  # 기본값이 아닌 경우만
                    selected_digit in phone_positions[digit_pos]):

                    coord = phone_positions[digit_pos][selected_digit]
                    cv2.circle(debug_img, coord, 12, (0, 0, 255), 3)  # 빨간색 원 (크기 12, 두께 3)
                    cv2.putText(debug_img, f"P{digit_pos}:{selected_digit}",
                               (coord[0]-15, coord[1]-20), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 255), 2)
            except (ValueError, KeyError):
                continue

        # 학생이 선택한 답을 빨간색 원으로 표시
        for q_num, student_answer in selected_answers.items():
            try:
                q_num_int = int(q_num)
                if (q_num_int in answer_positions and
                    student_answer not in ["무효"] and
                    student_answer in answer_positions[q_num_int]):

                    coord = answer_positions[q_num_int][student_answer]
                    cv2.circle(debug_img, coord, 15, (0, 0, 255), 3)  # 빨간색 원 (크기 15, 두께 3)
                    cv2.putText(debug_img, f"Q{q_num}:{student_answer}",
                               (coord[0]-20, coord[1]-25), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            except (ValueError, KeyError):
                continue

        # 정답과 학생 답안 비교 (모든 문제)
        correct_count = 0
        for q_num, correct_answer in correct_answers.items():
            if q_num in selected_answers:
                student_answer = selected_answers[q_num]
                if str(student_answer) == str(correct_answer):
                    correct_count += 1

        # 총점 계산
        total_score = calculate_total_score(selected_answers, correct_answers, question_scores)

        # 등급 계산
        grade = calculate_grade(total_score)

        # 결과 배열 생성
        results = create_results_array(selected_answers, correct_answers, question_scores, question_types)

        # 디버깅용 이미지 표시 (전처리된 이미지 + 인식 결과)
        cv2.imshow("OMR Debug - Blue=All positions (Phone & Answer), Red=All selections (Phone & Answer)",
                   cv2.resize(debug_img, (1200, 900), interpolation=cv2.INTER_CUBIC))
        
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        final_result = {
            "totalScore": total_score,
            "grade": grade,
            "phoneNumber": phone_number,
            "results": results,
            "imageInfo": {
                "originalSize": f"{w}x{h}",
                "resizedSize": f"{resized_w}x{resized_h}",
                "scaleFactors": {"x": scale_x, "y": scale_y},
                "aspectRatio": {"expected": expected_ratio, "actual": actual_ratio}
            }
        }

        return final_result

    except Exception as e:
        raise Exception(f"OMR 채점 실패: {str(e)}")

# --- 메인 실행 부분 ---

if __name__ == "__main__":
    try:
        # 커맨드라인 인자 파싱
        if len(sys.argv) != 5:
            # print(json.dumps({"error": "인자 개수가 올바르지 않습니다. 이미지경로, 정답, 배점, 문제유형이 필요합니다."}))
            sys.exit(1)
        
        image_path = sys.argv[1]
        # API에서 전달받은 JSON 문자열을 json.loads로 안전하게 파싱
        try:
            correct_answers = json.loads(sys.argv[2])
            question_scores = json.loads(sys.argv[3])
            question_types = json.loads(sys.argv[4])
        except json.JSONDecodeError as e:
            # print(json.dumps({"error": f"JSON 파싱 오류: {str(e)}"}))
            sys.exit(1)
        
        # OMR 채점 실행
        result = grade_omr(image_path, correct_answers, question_scores, question_types)
        
        # JSON 결과 출력 (디버그 메시지 없이)
        print(json.dumps(result, ensure_ascii=False))
        
    except Exception as e:
        # print(json.dumps({"error": str(e)}))
        sys.exit(1)
