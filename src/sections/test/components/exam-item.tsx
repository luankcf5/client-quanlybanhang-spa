import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';
import { fDate, fDateTime } from 'src/utils/format-time';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import { IExam } from 'src/types/exam';

// ----------------------------------------------------------------------

type Props = {
  exam: IExam;
  setExamSelected: (exam: IExam) => void;
};

export default function ExamItem({ exam, setExamSelected }: Props) {
  const openPassword = useBoolean();

  const loading = useBoolean();

  const checkPassword = useBoolean();

  const [password, setPassword] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleAccessPassword = useCallback(async () => {
    loading.onTrue();

    try {
      const response = await axios.post(
        `${endpoints.exam.root}/${exam.id}`,
        { password },
        {
          headers: {
            as: 'student',
          },
        }
      );
      loading.onToggle();
      checkPassword.onFalse();
      setExamSelected(response.data);
      handleClose();
      enqueueSnackbar('Bắt đầu bài thi !');
    } catch (error) {
      console.log(error);
      loading.onFalse();
      enqueueSnackbar('Mật khẩu không đúng, hãy thử lại !', { variant: 'error' });
    }
  }, [password, exam.password]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAccessPassword();
    }
  };

  const handleClose = useCallback(() => {
    checkPassword.onFalse();
    openPassword.onFalse();
  }, [checkPassword, openPassword]);

  return (
    <>
      <Card>
        <Stack sx={{ p: 3, pb: 2 }}>
          <Logo sx={{ mb: 2 }} />

          <ListItemText
            sx={{ mb: 2 }}
            primary={exam.name}
            secondary={`Được tạo lúc : ${fDate(exam.createdAt)}`}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ width: 'max-content' }}
            onClick={openPassword.onTrue}
            disabled={exam.isLocked}
          >
            Bắt đầu bài thi
          </Button>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
          {[
            {
              label: `Thời gian ${exam.duration} phút`,
              icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: 'Bài thi trắc nghiệm',
              icon: <Iconify width={16} icon="bxs:category-alt" sx={{ flexShrink: 0 }} />,
            },
            {
              label: `Gồm ${exam._count.question} câu hỏi`,
              icon: <Iconify width={16} icon="bi:question-diamond-fill" sx={{ flexShrink: 0 }} />,
            },
            {
              label: fDateTime(exam.start),
              icon: <Iconify width={16} icon="lets-icons:date-range-fill" sx={{ flexShrink: 0 }} />,
            },
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>

      <Dialog open={openPassword.value} onClose={handleClose}>
        <DialogTitle>Nhập mật khẩu bài thi</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 1 }}>
            Bài thi này cần mật khẩu để bắt đầu, vui lòng liên hệ giáo viên của bạn để nhận mật khẩu
            đề thi.
          </Typography>

          {checkPassword.value && (
            <Alert severity="error" sx={{ mb: 1 }}>
              Mật khẩu bài thi không đúng
            </Alert>
          )}

          <TextField
            autoFocus
            fullWidth
            margin="dense"
            variant="outlined"
            label="Mật khẩu bài thi..."
            value={password}
            onKeyUp={handleKeyUp}
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Đóng
          </Button>

          <LoadingButton
            variant="contained"
            color="primary"
            disabled={!password}
            loading={loading.value}
            onClick={handleAccessPassword}
          >
            Bắt đầu làm bài
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
