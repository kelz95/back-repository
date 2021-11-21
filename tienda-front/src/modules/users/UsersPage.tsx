/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Copyright from "#root/components/Copyright";
import Loading from "#root/components/Loading";
import NavBar from "#root/components/NavBar";
import Toolbar from "#root/components/Toolbar";
import useTableOptions from "#root/lib/hooks/useTableOptions";
import { namespaces } from "#root/translations/i18n.constants";

import CreateUserModal from "./CreateUserModal";
import DeleteUserDialog from "./DeleteUserDialog";
import { User } from "./types";
import UpdateUserModal from "./UpdateUserModal";
import UserController from "./UserController";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const { t } = useTranslation(namespaces.translation);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [clickedUser, setClickedUser] = useState<User | null>(null);

  const dataTableOptions = useTableOptions<User>({});

  const handleCreate = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleEdit = (currentUser: User) => {
    setClickedUser(currentUser);
    setIsUpdateUserModalOpen(true);
  };

  const handleDelete = (currentUser: User) => {
    setClickedUser(currentUser);
    setIsDeleteUserModalOpen(true);
  };

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    const [res, err] = await UserController.getAll({
      page: dataTableOptions.pageIndex,
      size: dataTableOptions.pageSize,
    });
    if (err) {
      enqueueSnackbar(`${t("common.error")}`, { variant: "error" });
      setIsLoading(false);
      return;
    }

    dataTableOptions.setTotalRows(res?.data.totalElements || 0);
    setUsers(res?.data.content || []);
    setIsLoading(false);
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize]);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h4" marginBottom="2rem" marginTop="1rem">
          {t("pages.user.list")}
        </Typography>

        <Toolbar
          createButtonText={t("pages.user.createUser")}
          searchValue={dataTableOptions.searchString}
          setSearchValue={dataTableOptions.setSearchString}
          onCreate={handleCreate}
        />

        <Loading isOpen={isLoading} />
        <UsersTable
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={dataTableOptions.pageIndex}
          rowsPerPage={dataTableOptions.pageSize}
          setPage={dataTableOptions.setPageIndex}
          setRowsPerPage={dataTableOptions.setPageSize}
        />

        <Copyright marginTop="2rem" />
      </Container>

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onCreateUser={fetchUsers}
      />
      <UpdateUserModal
        data={clickedUser}
        isOpen={isUpdateUserModalOpen}
        onClose={() => setIsUpdateUserModalOpen(false)}
        onUpdateUser={fetchUsers}
      />
      <DeleteUserDialog
        data={clickedUser}
        isOpen={isDeleteUserModalOpen}
        onClose={() => setIsDeleteUserModalOpen(false)}
        onDeleteUser={fetchUsers}
      />
    </>
  );
};

export default UsersPage;
