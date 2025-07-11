import { useMemo } from "react";
import { Student } from "../type/studentType";
import { Academy } from "../type/academyType";

interface Options {
  students: Student[];
  academys: Academy[];
  searchTerm: string;
  selectedAcademy: string;
  sortKey: "name" | "school" | null;
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

  const compareAcademyName = (
    userAcademyId: number,
    selectedAcademy: string,
  ) => {
    {
      // Converting Id to Name
      const userAcademy = academys.find((a) => a.academyId === userAcademyId);
      if (!userAcademy) {
        return;
      }
      return userAcademy.academyName === selectedAcademy;
    }
  };

  const filteredUsers = useMemo(() => {
    const x = students.filter((user) => {
      const matchesAcademy =
        selectedAcademy === "전체" ||
        compareAcademyName(user.academyId, selectedAcademy);

      return user.studentName.includes(searchTerm) && matchesAcademy;
    });

    return x;
  }, [students, searchTerm, selectedAcademy]);

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
  }, [students, filteredUsers, sortKey]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(start, start + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  return { paginatedUsers, totalPages };
};

export default useFilteredSortedPaginatedUsers;
