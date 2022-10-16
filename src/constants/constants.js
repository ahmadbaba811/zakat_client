
import axios from "axios";
import { serverLink } from "./url";
const CryptoJS = require("crypto-js");

export const shortCode = "ZKT"
export const projectCode = "ZAKAT MANAGEMENT";
export const projectSecretKey = "__ZKT_MGT_WIS-DOM!ICT"
export const projectLogo = ""

export const formatDateAndTime = (date, option) => {
    if (date !== null) {
      const user_date = new Date(date);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthNamesShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day =
        user_date.getDate() < 10
          ? "0" + user_date.getDate()
          : user_date.getDate();
      const hour =
        user_date.getHours() < 10
          ? "0" + user_date.getHours()
          : user_date.getHours();
      const min =
        user_date.getMinutes() < 10
          ? "0" + user_date.getMinutes()
          : user_date.getMinutes();
      const sec =
        user_date.getSeconds() < 10
          ? "0" + user_date.getSeconds()
          : user_date.getSeconds();
  
      let date_string = "";
      if (option === "date_and_time")
        date_string = `${day}-${monthNames[user_date.getMonth()]
          }-${user_date.getFullYear()} : ${hour}:${min}:${sec}`;
      else if (option === "date")
        date_string = `${day}-${monthNames[user_date.getMonth()]
          }-${user_date.getFullYear()}`;
      else if (option === "day") date_string = day;
      else if (option === "full_month")
        date_string = monthNames[user_date.getMonth()];
      else if (option === "short_month")
        date_string = monthNamesShort[user_date.getMonth()];
      else if (option === "year_only") date_string = user_date.getFullYear();
  
      return date_string;
    } else {
      return "--";
    }
  };
  
 
  
  export const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  };
  
  export const currencyConverter = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    });
    return formatter.format(amount);
  };
  
  export function encryptData(string) {
    let secret_key = projectSecretKey;
    let secret_iv = projectSecretKey;
    // hash
    let kee = CryptoJS.SHA256(secret_key);
    let ivv = CryptoJS.SHA256(secret_iv).toString().substr(0, 16);
  
    kee = CryptoJS.enc.Utf8.parse(kee.toString().substr(0, 32));
    ivv = CryptoJS.enc.Utf8.parse(ivv);
  
    let decrypted = CryptoJS.AES.encrypt(string, kee, { iv: ivv });
  
    let result = decrypted.toString();
    return btoa(result);
  }
  
  export function decryptData(string) {
    let secret_key = projectSecretKey;
    let secret_iv = projectSecretKey;
    // hash
    let kee = CryptoJS.SHA256(secret_key);
    let ivv = CryptoJS.SHA256(secret_iv).toString().substr(0, 16);
  
    kee = CryptoJS.enc.Utf8.parse(kee.toString().substr(0, 32));
    ivv = CryptoJS.enc.Utf8.parse(ivv);
  
    var decrypted = CryptoJS.AES.decrypt(atob(string), kee, { iv: ivv });
  
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  export const sendMail = (receiver, subject, body) => {
    axios.post(`${serverLink}mail/send_mail`, { receiver: receiver, subject: subject, body: body }).then((res) => {
      if (res.data.message === "success") {
  
      } else {
        console.log(res.data)
      }
    })
  }

  export const Audit = (message, branch, actionBy, token) => {
    axios.post(`${serverLink}settings/audit`, { Message:message, Branch: branch, InsertedBy:actionBy}, token).then((res) => {
      if (res.data.message === "success") {
  
      } else {
        console.log(res.data)
      }
    })
  }

  export const colorsclasses_lt  = ["primary-lt", "success-lt", "danger-lt", "info-lt", "secondary-lt", "warning-lt"]
