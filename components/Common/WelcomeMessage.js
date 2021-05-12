import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from 'next/link';

export const HeaderMessage = () => {
  const router = useRouter()
  const signupRoute = router.pathname === "/signup"

  return (
    <Message 
      color="teal"
      attached
      header={signupRoute ? "Aan De Slag" : "Hallo, je ben terug gekomen"}
      icon={signupRoute ? "setting" : "privacy"}
      content={signupRoute ? "Creer nieuw account" : "Aanmelden met Email of Wachtwoord"}
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Bestaande gebruiker?{" "}
            <Link href="/login">
              Aanmeld zich hier dan
            </Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached="bottom" info>
            <Icon name="lock" />
            <Link href="/reset">
              Vergeet Wachtwoord?
            </Link>
          </Message>

          <Message attached="bottom" warning>
            <Icon name="help" />
              Niuwe gebruiker?
            <Link href="/signup">Inschrijven
            </Link> In plaats van{" "}
          </Message>
        </>
      )}
      </>
  );

};