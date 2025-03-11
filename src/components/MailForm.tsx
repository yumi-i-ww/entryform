import { useState } from "react";
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
import { ConfirmDialog } from "./ConfirmDialog.js";
import { LabelWidthContent } from "./ui/LabelWidthContent.js";
import { apiClient } from "~/api/api-client";
import type { Schemas } from "~/api/types";
import {
  postInquirySchema,
  type PostInquiryFormValue,
} from "~/validation/postInquirySchema";

const employmentType = ["正社員", "契約社員", "アルバイト", "その他"];
const websiteToLearnAboutUs = [
  "弊社HP",
  "Indeed",
  "engage",
  "OpenWork",
  "その他",
];
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
  const [inquiryData, setInquiryData] =
    useState<Schemas.EntryCreateRequestSchema | null>(null);
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenConfirmDialog = (data: PostInquiryFormValue) => {
    setInquiryData(data);

    handleOpen();
  };

  const handleSend = async (data: Schemas.EntryCreateRequestSchema) => {
    try {
      setIsSendLoading(true);
      await apiClient.createEntry({
        requestBody: data,
      });
      alert("エントリー内容を送信しました。");
    } catch (error) {
      console.error(error);
      alert("エントリー送信に失敗しました。");
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
            <Typography sx={{ my: 3 }}>
              エントリーは、下記のフォームに必要事項をご記入の上、「確認する」ボタンを押してください。
            </Typography>
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
                  {...register("employmentType")}
                  defaultValue={""}
                  sx={{
                    textAlign: "left",
                  }}
                  error={Boolean(errors.employmentType)}
                >
                  <MenuItem value="" disabled>
                    選択してください
                  </MenuItem>
                  {employmentType.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.employmentType)}>
                  {errors.employmentType?.message}
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
                  {...register("nearestStation")}
                  error={Boolean(errors.nearestStation)}
                  placeholder="例）JR山手線 渋谷駅"
                />
                <FormHelperText error={Boolean(errors.nearestStation)}>
                  {errors.nearestStation?.message}
                </FormHelperText>
              </FormControl>
            }
          />
          <LabelWidthContent
            label={"弊社を知るきっかけになった媒体*"}
            content={
              <FormControl fullWidth>
                <Select
                  {...register("websiteToLearnAboutUs")}
                  defaultValue={""}
                  sx={{
                    textAlign: "left",
                  }}
                  error={Boolean(errors.websiteToLearnAboutUs)}
                >
                  <MenuItem value="" disabled>
                    選択してください
                  </MenuItem>
                  {websiteToLearnAboutUs.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.websiteToLearnAboutUs)}>
                  {errors.websiteToLearnAboutUs?.message}
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
                  {...register("workingTime")}
                  error={Boolean(errors.workingTime)}
                />
                <FormHelperText error={Boolean(errors.workingTime)}>
                  {errors.workingTime?.message}
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
