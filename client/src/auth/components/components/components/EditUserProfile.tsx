import { AlertTitle, Button, Stack, TextField } from '@mui/material';
import useAuth from 'auth/hooks/useAuth';
import ProfilePicEditor from 'components/ProfilePicEditor/ProfilePicEditor';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface IEditUserProfileProps {
}

interface IEditProfileDetailDto {
    name: string;
    photo: string;
}

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Please specify your name')
        .min(5, 'The Full Name should have at minimum length of 5'),
});



const EditUserProfile: React.FunctionComponent<IEditUserProfileProps> = (props) => {
    const { userProfile } = useAuth()

    const initialValues = {
        name: userProfile?.name || '',
        photo: userProfile?.photo || ''
    };

    const onLocalSubmit = async (values: IEditProfileDetailDto): Promise<any> => {
        try {
            //   const response = await localRegisterService(values);
            //   await handleCompletingLoginFlow(response.data);
        }
        catch (ex) {
            //   const err = ex as AxiosError<{ msg: string }>
            //   enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: onLocalSubmit,
    });

    return (
        <Stack direction={'column'} spacing={2}>

            <AlertTitle><strong>☉</strong> You can only edit your <strong>profile picture</strong> and <strong>name</strong> here — <strong>try it!</strong></AlertTitle>


            <ProfilePicEditor formik={formik} />
            <TextField
                required
                label="Full Name"
                variant="outlined"
                name={'name'}
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={
                    formik.touched.name && Boolean(formik.errors.name)
                }
                onBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
            />
            <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                fullWidth
            >
                <strong>Finalize Your Edit</strong>
            </Button>
        </Stack>
    )
};

export default EditUserProfile;
