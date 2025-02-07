import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  Typography,
  styled,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostInquiryFormValue,
  postInquirySchema,
} from "../validation/postInquirySchema";
import { ConfirmDialog } from "./ConfirmDialog";
import { LabelWidthContent } from "./ui/LabelWidthContent";

const employCategory = ["正社員", "契約社員", "アルバイト", "その他"];
const mediaCategory = ["弊社HP", "Indeed", "engage", "OpenWork", "その他"];
const CustomTextField = styled(TextField)(() => ({}));

export default function MailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInquiryFormValue>({
    resolver: zodResolver(postInquirySchema),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [inquiryData, setInquiryData] = useState<PostInquiryFormValue | null>(
    null
  );
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenConfirmDialog = (data: PostInquiryFormValue) => {
    setInquiryData(data);
    handleOpen();
  };

  const handleSend = async () => {
    try {
      setIsSendLoading(true);
      // Simulate sending data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("内容を送信しました。");
    } catch (error) {
      console.error(error);
      alert("内容送信に失敗しました。");
    } finally {
      setIsSendLoading(false);
      handleClose();
      setInquiryData(null);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        margin: "0 auto",
        mb: 2,
        maxWidth: "50%",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: 3,
      }}
    >
      {inquiryData && (
        <ConfirmDialog
          open={open}
          loading={isSendLoading}
          inquiryData={inquiryData}
          handleClose={handleClose}
          handleSend={handleSend}
        />
      )}
      <Box>
        <Box className="mailFormExplain">
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h4">{"エントリーフォーム"}</Typography>
          </Box>
          <Box sx={{ my: 2, textAlign: "left" }}>
            {/* 文言は変える */}
            <Typography sx={{ my: 3 }}>
              エントリーは、下記のフォームに必要事項をご記入の上、「確認する」ボタンを押してください。
            </Typography>
            {/* <Box sx={{ fontSize: "small" }}>
              <Typography>
                ※ご入力いただいた内容に関しましては、採用活動のために利用させていただきます。
              </Typography>
            </Box> */}
          </Box>
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSubmit(handleOpenConfirmDialog)}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <LabelWidthContent
            label={"応募する雇用形態を選択*"}
            content={
              <FormControl fullWidth>
                <Select
                  {...register("employCategory")}
                  defaultValue={""}
                  sx={{
                    textAlign: "left",
                  }}
                  error={Boolean(errors.employCategory)}
                >
                  <MenuItem value="" disabled>
                    選択してください
                  </MenuItem>
                  {employCategory.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.employCategory)}>
                  {errors.employCategory?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <Box display={"flex"} gap={3} width="100%">
            <LabelWidthContent
              label={"姓*"}
              content={
                <FormControl>
                  <CustomTextField
                    placeholder="名字を入力"
                    {...register("familyName")}
                    error={Boolean(errors.familyName)}
                  />
                  <FormHelperText error={Boolean(errors.familyName)}>
                    {errors.familyName?.message}
                  </FormHelperText>
                </FormControl>
              }
            />

            <LabelWidthContent
              label={"名*"}
              content={
                <FormControl>
                  <CustomTextField
                    placeholder="名前を入力"
                    {...register("firstName")}
                    error={Boolean(errors.firstName)}
                  />
                  <FormHelperText error={Boolean(errors.address)}>
                    {errors.address?.message}
                  </FormHelperText>
                </FormControl>
              }
            />
          </Box>
          <LabelWidthContent
            label={"メールアドレス*"}
            content={
              <FormControl fullWidth>
                <CustomTextField
                  type="email"
                  required
                  placeholder="example@example.com"
                  {...register("email")}
                  error={Boolean(errors.email)}
                />
                <FormHelperText error={Boolean(errors.email)}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <LabelWidthContent
            label={"住所"}
            content={
              <FormControl fullWidth>
                <CustomTextField
                  placeholder="住所を入力"
                  {...register("address")}
                  error={Boolean(errors.address)}
                />
                <FormHelperText error={Boolean(errors.address)}>
                  {errors.address?.message}
                </FormHelperText>
                <Box sx={{ textAlign: "left" }}>
                  <Typography>
                    日本以外場合、「国名」+「都市名」で入力してください
                  </Typography>
                  <Typography>例）アメリカ・ワシントン</Typography>
                </Box>
              </FormControl>
            }
          />
          <LabelWidthContent
            label={"最寄駅"}
            content={
              <FormControl fullWidth>
                <CustomTextField
                  {...register("station")}
                  error={Boolean(errors.station)}
                  placeholder="例）JR山手線 渋谷駅"
                />
                <FormHelperText error={Boolean(errors.station)}>
                  {errors.station?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <LabelWidthContent
            label={"弊社を知るきっかけになった媒体*"}
            content={
              <FormControl fullWidth>
                <Select
                  {...register("mediaCategory")}
                  defaultValue={""}
                  sx={{
                    textAlign: "left",
                  }}
                  error={Boolean(errors.mediaCategory)}
                >
                  <MenuItem value="" disabled>
                    選択してください
                  </MenuItem>
                  {mediaCategory.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.mediaCategory)}>
                  {errors.mediaCategory?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <LabelWidthContent
            label={"稼働時間"}
            content={
              <FormControl fullWidth>
                <CustomTextField
                  type="text"
                  required
                  placeholder="稼働時間(フルタイム/〇曜日/週〇時間など)"
                  {...register("workTime")}
                  error={Boolean(errors.workTime)}
                />
                <FormHelperText error={Boolean(errors.workTime)}>
                  {errors.workTime?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <LabelWidthContent
            label={"その他特記事項"}
            content={
              <FormControl fullWidth>
                <CustomTextField
                  type="text"
                  required
                  placeholder="あればご記入ください"
                  {...register("other")}
                  error={Boolean(errors.other)}
                />
                <FormHelperText error={Boolean(errors.other)}>
                  {errors.other?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <Box sx={{ textAlign: "left" }}>
            <Typography sx={{ my: 2 }}>
              *のついている項目は必ず入力をお願いいたします。
            </Typography>
            <Box sx={{ fontSize: "small" }}>
              <Typography>
                履歴書(必須)・職務経歴書(任意)・研究内容(学生の方のみ) (任意)
              </Typography>
              <Typography>
                提出書類は下記メールアドレスに添付してご送信ください。
              </Typography>
            </Box>
            <Typography
              sx={{ my: 1, fontWeight: "bold", textDecoration: "underline" }}
            >
              recruiting@world-wing.com
            </Typography>
          </Box>

          <Box display={"flex"} alignSelf={"center"}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mx: 2 }}
              onClick={handleSubmit(handleOpenConfirmDialog)}
            >
              確認する
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
