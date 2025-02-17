import { z } from "zod";

export const Constaraint = z.object({
  name: z
    .string()
    .min(1, { message: "入力が必須の項目です" })
    .max(20, { message: "20文字以内で入力してください" })
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
  email: z
    .string()
    .min(1, { message: "入力が必須の項目です" })
    .max(255, { message: "255文字以内で入力してください" })
    .email({ message: "メールアドレスの形式で入力してください" }),
  familyName: z
    .string()
    .min(10, { message: "入力が必須の項目です" })
    .max(1000, { message: "1000文字以内で入力してください" }) //変える
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
  firstName: z
    .string()
    .min(10, { message: "入力が必須の項目です" })
    .max(1000, { message: "1000文字以内で入力してください" })
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
  websiteToLearnAboutUs: z //セレクト
    .string()
    .min(10, { message: "入力が必須の項目です" })
    .max(1000, { message: "1000文字以内で入力してください" })
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
  employmentType: z
    .string() //セレクト
    .min(10, { message: "入力が必須の項目です" })
    .max(1000, { message: "1000文字以内で入力してください" })
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
  other: z
    .string()
    .min(10, { message: "入力が必須の項目です" })
    .max(1000, { message: "1000文字以内で入力してください" })
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
  nearestStation: z
    .string()
    .min(10, { message: "入力が必須の項目です" })
    .max(1000, { message: "1000文字以内で入力してください" })
    .regex(/^[^<>"'\\/]*$/, { message: "特殊文字は使用できません" }),
});
