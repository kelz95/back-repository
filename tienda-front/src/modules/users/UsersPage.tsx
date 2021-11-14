/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import Copyright from "#root/components/Copyright";
import Loading from "#root/components/Loading";
import NavBar from "#root/components/NavBar";
import Toolbar from "#root/components/Toolbar";
import useDebounce from "#root/lib/hooks/useDebounce";
import useTableOptions from "#root/lib/hooks/useTableOptions";

import CreateUserModal from "./CreateUserModal";
import UserController from "./UserController";
import UsersTable from "./UsersTable";
import { User } from "./types";

import { useTranslation } from "react-i18next";
import { namespaces } from "#root/translations/i18n.constants";

const defaultUsers: User[] = [];

const UsersPage = () => {
  const { t } = useTranslation(namespaces.pages.users);

  const [isLoading, setIsLoading] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const dataTableOptions = useTableOptions<User>({});
  const debouncedSearchString = useDebounce(dataTableOptions.searchString, 300);

  const handleCreate = () => {
    console.log("create");
    setIsCreateUserModalOpen(true);
  };

  const handleEdit = (currentUser: User) => {
    console.log("edit", currentUser);
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    const [res, err] = await UserController.getAll({
      page: dataTableOptions.pageIndex,
      size: dataTableOptions.pageSize,
      name: encodeURI(debouncedSearchString),
    });
    console.log({ res, err });

    // const [resOperators, errOperators] = await OperatorController.fetchAll({
    //   limit: String(dataTableOptions.limit),
    //   offset: String(dataTableOptions.offset),
    //   searchString: dataTableOptions.searchString,
    // });
    // if (errOperators) {
    //   toast({ title: "Algo salió mal", status: "error" });
    //   setIsLoading(false);
    //   return;
    // }
    // const contentRangeHeader = resOperators?.headers["content-range"];
    // const totalFromHeader = contentRangeHeader?.split("/").pop() || "0";
    // dataTableOptions.setTotalRows(parseInt(totalFromHeader, 10));
    // setProducts(resOperators?.data || []);
    setUsers(defaultUsers);
    setIsLoading(false);
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize, debouncedSearchString]);

  useEffect(() => {
    fetchUsers();
  }, [dataTableOptions.pageIndex, dataTableOptions.pageSize, debouncedSearchString]);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h4" marginBottom="2rem" marginTop="1rem">
          {t("list")}
        </Typography>

        <Toolbar
          createButtonText={t("cUser")}
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
      />
    </>
  );
};

export default UsersPage;
