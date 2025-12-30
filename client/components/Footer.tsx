import InstagramIcon from "@/assets/images/icons/InstagramIcon";
import TelegramIcon from "@/assets/images/icons/TelegramIcon";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-[#e0e0e04d] py-2">
      <div className="flex w-full justify-between px-10">
        <h1 className="text-2xl font-bold">Market</h1>
        <div className="flex gap-2">
          <IconButton className="p-1 rounded-[10px] shadow-sm">
            <InstagramIcon />
          </IconButton>
          <IconButton className="p-1 rounded-[10px] shadow-sm">
            <TelegramIcon />
          </IconButton>
        </div>
      </div>
      <p className="text-center">
        Copyright © 2023 EnergizeX. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
