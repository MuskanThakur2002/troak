export const validator = (name: any, value: string, data: any) => {
  switch (name) {
    case "userName":
      if (!value) return { [name]: "Reqired" };
      return { [name]: "" };

    case "termsAndCondition":
      if (!value) return { [name]: "Reqired" };
      return { [name]: "" };

    case "mobileNumber":
      if (!value) return { [name]: "Reqired" };
      if (value.length < 10) return { [name]: "Number should have 10 digit" };
      return { [name]: "" };

    case "confirmMobileNumber":
      if (!value) return { [name]: "Reqired" };
      if (value.length < 10) return { [name]: "Number should have 10 digit" };
      return { [name]: "" };

    case "partnerName":
      if (!value) return { [name]: "Reqired" };
      if (value.length < 3)
        return { [name]: "Partner Name should have atleast 3 characters" };
      return { [name]: "" };

    case "confirmPartnerName":
      if (!value) return { [name]: "Reqired" };
      if (value.length < 3)
        return { [name]: "Partner Name should have atleast 3 characters" };
      return { [name]: "" };

    default:
      return { [name]: "" };
  }
};
