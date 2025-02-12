import { Box, Link } from "@mui/material";
import corporate_logo from "../../assets/Tsubasa_logo.png";

export const Header = () => {
  const links = [
    {
      href: "https://d33qbqncrx6x37.cloudfront.net/#kaihatsu_shisei",
      label: "開発姿勢",
    },
    {
      href: "https://d33qbqncrx6x37.cloudfront.net/#kaihatsu_purosesu",
      label: "開発プロセス",
    },
    {
      href: "https://d33qbqncrx6x37.cloudfront.net/#jigyou_ryouiki",
      label: "事業領域",
    },
    { href: "https://spot-f.com/index.html", label: "spot.f" },
    {
      href: "https://d33qbqncrx6x37.cloudfront.net/#kaisya_gaiyou",
      label: "会社概要",
    },
    {
      href: "https://d33qbqncrx6x37.cloudfront.net/recruit",
      label: "採用について",
    },
    {
      href: "https://f04-contact.f02-nfc.teba-saki.net/",
      label: "お問い合わせ",
    },
  ];

  const NavigationLinks: React.FC = () => {
    return (
      <Box display="flex" flexDirection="row" gap={3} sx={{ fontSize: "16px" }}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: "#333",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {link.label}
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderBottom: "2px solid #ddd",
        height: 86,
        px: 4,
        backgroundColor: "#fff",
      }}
    >
      {/* ロゴ */}
      <Box
        className="header_logo"
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 8,
        }}
      >
        <a
          href="https://www.world-wing.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={corporate_logo}
            alt="corporate-logo"
            style={{ height: 40 }}
          />
        </a>
      </Box>
      {/* リンク */}
      <Box className="header_nav">
        <NavigationLinks />
      </Box>
    </Box>
  );
};
