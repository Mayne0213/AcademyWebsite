import { useMemo, useCallback } from "react";
import { Student } from "@/entities/student/model/types";
import { Academy } from "@/entities/academy/model/types";

interface Options {
  students: Student[];
  academys: Academy[];
  searchTerm: string;
  selectedAcademy: string;
  sortKey: string | null;
  currentPage: number;
}

const useFilteredSortedPaginatedUsers = ({
  students,
  academys,
  searchTerm,
  selectedAcademy,
  sortKey,
  currentPage,
}: Options) => {
  const itemsPerPage = 20;

  const compareAcademyName = useCallback(
    (userAcademyId: number, selectedAcademy: string) => {
      const userAcademy = academys.find((a) => a.academyId === userAcademyId);
      if (!userAcademy) {
        return;
      }
      return userAcademy.academyName === selectedAcademy;
    },
    [academys]
  );

  const filteredUsers = useMemo(() => {
    const x = students.filter((user) => {
      const matchesAcademy =
        selectedAcademy === "전체" ||
        compareAcademyName(user.academyId, selectedAcademy);

      return user.studentName.includes(searchTerm) && matchesAcademy;
    });

    return x;
  }, [students, searchTerm, selectedAcademy, compareAcademyName]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortKey === "name") {
        return a.studentName.localeCompare(b.studentName);
      }
      if (sortKey === "school") {
        return a.studentHighschool.localeCompare(b.studentHighschool);
      }
      return 0;
    });
  }, [filteredUsers, sortKey]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const totalUsers = sortedUsers.length;

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(start, start + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  return { totalPages, totalUsers, paginatedUsers };
};

export default useFilteredSortedPaginatedUsers;
