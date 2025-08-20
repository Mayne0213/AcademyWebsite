import { useCallback } from 'react';
import { Admin, CreateAdminRequest, UpdateAdminRequest } from "@/src/entities/admin/model/types";
import { adminApi } from '@/src/entities/admin/api';
import { useAdminStore } from "@/src/entities/admin/model/store";

export const useAdminFeatureStore = () => {
  const entityStore = useAdminStore.getState();
  
  // 1. 간략한 정보만을 불러오는 함수
  const readAdminSummaries = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      entityStore.readAdminSummaries(await adminApi.readAdminSummaries());
    } finally {
      entityStore.setLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. 디테일한 개인의 정보를 전부 불러오는 함수
  const readAdmins = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      entityStore.readAdmins(await adminApi.readAdmins());
    } finally {
      entityStore.setLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. adminId를 받아서 해당하는 개인의 간략한 정보만을 불러오는 함수
  const getAdminSummary = useCallback(async (adminId: number) => {
    entityStore.setLoading(true);
    try {
      entityStore.getAdminSummary(await adminApi.getAdminSummary(adminId));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  // 4. adminId를 받아서 해당하는 개인의 디테일한 정보를 불러오는 함수
  const getAdmin = useCallback(async (adminId: number) => {
    entityStore.setLoading(true);
    try {
      entityStore.getAdmin(await adminApi.getAdmin(adminId));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const createAdmin = useCallback(async (newAdmin: CreateAdminRequest) => {
    entityStore.setLoading(true);
    try {
      entityStore.createAdmin(await adminApi.createAdmin(newAdmin));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const updateAdmin = useCallback(async (adminId: number, updateData: UpdateAdminRequest) => {
    entityStore.setLoading(true);
    try {
      entityStore.updateAdmin(await adminApi.updateAdmin(adminId, updateData as Admin));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const deleteAdmin = useCallback(async (adminId: number) => {
    entityStore.setLoading(true);
    try {
      entityStore.deleteAdmin(await adminApi.deleteAdmin(adminId));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  return {
    readAdminSummaries,
    readAdmins,
    getAdminSummary,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
  };
};
