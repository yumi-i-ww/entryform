import type React from "react";
import { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { LabelWidthContent } from "./ui/LabelWidthContent";
import type { Schemas } from "~/api/types";

interface ConfirmDialogProps {
  open: boolean;
  loading: boolean;
  inquiryData: Schemas.EntryCreateRequestSchema;
  handleClose: () => void;
  handleSend: (inquiryData: Schemas.EntryCreateRequestSchema) => Promise<void>;
}

export function ConfirmDialog({
  open,
  loading,
  inquiryData,
  handleClose,
  handleSend,
}: ConfirmDialogProps): React.ReactElement {
  const {
    familyName,
    firstName,
    email,
    address,
    nearestStation,
    workingTime,
    other,
  } = inquiryData;
  const [checked, setChecked] = useState<boolean>(false);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
        <DialogTitle>確認</DialogTitle>
        <DialogContent
          sx={{
            "&.MuiDialogContent-root": {
              pt: 1,
            },
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ my: 4 }}>
              以下の内容で送信します。内容をご確認ください。
            </Typography>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              {firstName && (
                <LabelWidthContent
                  label="名字"
                  content={<Typography fontSize={18}>{familyName}</Typography>}
                  isDirectionRow={true}
                />
              )}
              {familyName && (
                <LabelWidthContent
                  label="名前"
                  content={<Typography fontSize={18}>{firstName}</Typography>}
                  isDirectionRow={true}
                />
              )}

              {email && (
                <LabelWidthContent
                  label="メールアドレス"
                  content={<Typography fontSize={18}>{email}</Typography>}
                  isDirectionRow={true}
                />
              )}
              {address && (
                <LabelWidthContent
                  label="住所"
                  content={<Typography fontSize={18}>{address}</Typography>}
                  isDirectionRow={true}
                />
              )}
              {nearestStation && (
                <LabelWidthContent
                  label="最寄駅"
                  content={
                    <Typography fontSize={18}>{nearestStation}</Typography>
                  }
                  isDirectionRow={true}
                />
              )}
              {workingTime && (
                <LabelWidthContent
                  label="稼働時間(フルタイムではない方)"
                  content={<Typography fontSize={18}>{workingTime}</Typography>}
                  isDirectionRow={true}
                />
              )}
              {other && (
                <LabelWidthContent
                  label="その他特記事項"
                  content={<Typography fontSize={18}>{workingTime}</Typography>}
                  isDirectionRow={true}
                />
              )}
            </Box>
            <Box>
              <Typography sx={{ my: 2 }}>
                *のついている項目は必ずチェックをお願いいたします。
              </Typography>
              <FormControlLabel
                required
                control={<Checkbox />}
                label="履歴書等の書類を送信しました。"
              />
              <Box />
              <FormControlLabel
                control={<Checkbox onChange={handleChangeChecked} required />}
                label="私は「個人情報の取り扱いについて」を理解した上で、 同意します。"
              />
              <Typography>
                <a href="https://www.world-wing.com/privacy-handling-inquiry">
                  個人情報の取り扱いについてはこちら
                </a>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ gap: 4, px: 5, pb: 2 }}>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            loading={loading}
            variant="contained"
            disabled={!checked}
            onClick={() => handleSend(inquiryData)}
          >
            送信
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
