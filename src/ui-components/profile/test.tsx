import React from "react";
import styles from "@/styles/test.module.scss";
import Profile from "@/../public/default_icons/profileImg.png";
import Image from "next/image";

type Props = {};

const test = (props: Props) => {
  return (
    <div>
      <div className={`${styles.wrapper}`}>
        <Image className={`${styles.profile}`} src={Profile} alt={``} />
        <input type="text" className={`${styles.name}`}></input>
        <button className={`${styles.submit_bttn}`}></button>
      </div>
    </div>
  );
};

export default test;
