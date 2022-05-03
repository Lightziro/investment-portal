import React, { useContext, useEffect, useState } from "react";
import {
    Divider,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { RoleUserChip } from "../../../../components/simple/role-user-chip/RoleUserChip";
import { FormProfile } from "../form-profile/FormProfile";
import { axios } from "../../../../utils/axios";
import { CountryModel } from "../../../../ts/types/entity/other.types";
import { ProfileContext } from "../../contexts/ProfileContext";

export const ProfileUserInfo: React.FC = () => {
    const { profile } = useContext(ProfileContext);
    const [edit, setEdit] = useState(false);
    const [counties, setCountries] = useState<CountryModel[]>([]);
    const { data } = useRootSelector((store) => store.user);
    useEffect(() => {
        fetchCountries();
    }, []);
    const fetchCountries = async () => {
        const countries = await axios
            .get(`${process.env.API_URL}/api/other/countries`)
            .then((res) => res.data);
        await setCountries(countries);
    };
    return (
        <Paper sx={{ px: 2, py: 1 }} elevation={2}>
            <Stack
                sx={{ mb: 1 }}
                justifyContent="space-between"
                direction="row"
            >
                <Stack direction="row" alignItems="center">
                    <Typography variant="h5">{profile.full_name}</Typography>
                    <RoleUserChip role={profile.role?.name} />
                </Stack>
                {data?.user_id === profile.user_id && (
                    <Tooltip title="Edit">
                        <IconButton onClick={() => setEdit(!edit)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
            <Divider />
            <FormProfile
                edit={edit}
                handleEdit={() => setEdit(!edit)}
                countries={counties}
            />
        </Paper>
    );
};
