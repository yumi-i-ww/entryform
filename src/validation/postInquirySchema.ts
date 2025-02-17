import { z } from "zod";

export const postInquirySchema = z.object({
  familyName: z.string().nonempty("姓を入力してください"),

  firstName: z.string().nonempty("名を入力してください"),

  email: z.string().email("正しいメールアドレスを入力してください"),

  nearestStation: z.string(),

  workingTime: z.string(),

  address: z.string(),

  websiteToLearnAboutUs: z
    .string()
    .nonempty("弊社を知るきっかけになった媒体を選択してください"),

  employmentType: z.string().nonempty("応募する雇用形態を選択してください"),

  other: z.string(),
});

export type PostInquiryFormValue = z.infer<typeof postInquirySchema>;
