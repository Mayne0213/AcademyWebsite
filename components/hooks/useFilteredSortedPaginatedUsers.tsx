import { useMemo, useCallback } from "react";
import { Student } from "@/src/entities/student/model/types";
import { Academy } from "@/src/entities/academy/model/types";

type ActiveStatus = 'all' | 'active' | 'inactive';

interface Options {
  students: Student[];
  academies: Academy[];
  searchTerm: string;
  selectedAcademy: string;
  sortKey: string | null;
  currentPage: number;
  activeStatusFilter?: ActiveStatus;
}

const useFilteredSortedPaginatedUsers = ({
  students,
  academies,
  searchTerm,
  selectedAcademy,
  sortKey,
  currentPage,
  activeStatusFilter = 'all',
}: Options) => {
  const itemsPerPage = 20;

  const compareAcademyName = useCallback(
    (userAcademyId: number, selectedAcademy: string) => {
      const userAcademy = academies.find((a) => a.academyId === userAcademyId);
      if (!userAcademy) {
        return;
      }
      return userAcademy.academyName === selectedAcademy;
    },
    [academies]
  );

  const filteredUsers = useMemo(() => {
    const x = students.filter((student) => {
      const matchesAcademy =
        selectedAcademy === "전체" ||
        compareAcademyName(student.academyId, selectedAcademy);

      const matchesActiveStatus =
        activeStatusFilter === 'all' ||
        (activeStatusFilter === 'active' && student.isActive === true) ||
        (activeStatusFilter === 'inactive' && student.isActive === false);

      return student.studentName.includes(searchTerm) && matchesAcademy && matchesActiveStatus;
    });

    return x;
  }, [students, searchTerm, selectedAcademy, compareAcademyName, activeStatusFilter]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortKey === "name") {
        return a.studentName.localeCompare(b.studentName);
      }
      if (sortKey === "school") {
        return a.studentHighschool?.localeCompare(b.studentHighschool || "") || 0;
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
