import { Typography, Container } from "@material-ui/core";
import CenterFluidLayout from "components/layouts/CenterFluidLayout";
import "firebase/auth";
import React from "react";
import { firebaseAuth } from "../../firebases/FirebaseIndex";
import BasicPaperLayout from "../layouts/BasicPaperLayout";
import PhonenumberSendCode from "./PhonenumberSendCode";
import PhonenumberVerifyCode from "./PhonenumberVerifyCode";

const VN_COUNTRY_PHONE_PREFIX = "+84";

function PhonenumberRegister() {
  const [confirmResultFn, setConfirmResultFn] = React.useState(undefined);
  const [err, setErr] = React.useState();
  const [loading, setLoading] = React.useState();

  const onSendingCode = (data) => {
    setLoading(true);
    console.log(data);
    let phoneStr = VN_COUNTRY_PHONE_PREFIX + data.phone;
    firebaseAuth
      .signInWithPhoneNumber(phoneStr, window.recaptchaVerifier)
      .then((confirmResult) => {
        console.log(confirmResult);
        setConfirmResultFn(confirmResult);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <CenterFluidLayout>
      <Container maxWidth="xs">
        <BasicPaperLayout>
          {err && (
            <Typography variant="body2" color="error" align="center">
              {err}
            </Typography>
          )}
          <PhonenumberSendCode onSubmit={onSendingCode} loading={loading} />

          <PhonenumberVerifyCode
            phoneVerifyFn={confirmResultFn}
            showVerifyDialog={confirmResultFn}
          />
        </BasicPaperLayout>
      </Container>
    </CenterFluidLayout>
  );
}

export default PhonenumberRegister;
