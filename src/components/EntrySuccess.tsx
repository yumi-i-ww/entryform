import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function EntrySuccess() {
  return (
    <div
      className="entry-success"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign="center">
        <Box className="entrySuccessTitle">
          <Typography variant="h6">エントリー完了</Typography>
        </Box>
        <Box className="entrySuccessMessage" sx={{ my: 2, textAlign: "left" }}>
          <Typography>
            この度は、弊社にエントリーいただきまして、誠にありがとうございます。
          </Typography>
          <Typography>エントリーを受け付けました。</Typography>
          <Typography>
            選考後に、担当者よりご連絡させていただきます。
            今しばらくお待ち下さいませ。
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" href="https://www.world-wing.com/">
            トップへ戻る
          </Button>
        </Box>
      </Box>
    </div>
  );
}
