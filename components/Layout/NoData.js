import { Message, Button } from "semantic-ui-react";

export const NoProfilePosts = () => (
  <>
    <Message info icon="meh" header="Sorry" content="Gebruiker heeft nog niets gepost!" />
    <Button icon="long arrow alternate left" content="Ga Terug" as="a" href="/" />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message icon="user outline" info content="Gebruiker heeft geen volgers" />
    )}

    {followingComponent && (
      <Message icon="user outline" info content="Gebruiker volgt geen gebruikers" />
    )}
  </>
);

export const NoMessages = () => (
  <Message
    info
    icon="telegram plane"
    header="Sorry"
    content="Je hebt nog niemand een bericht gestuurd.Zoek hierboven naar bericht iemand!"
  />
);

export const NoPosts = () => (
  <Message
    info
    icon="meh"
    header="Hey!"
    content="Geen Posts. Zorg ervoor dat je iemand hebt gevolgd."
  />
);

export const NoProfile = () => (
  <Message info icon="meh" header="Hallo!" content="Geen Profiel Gevonden." />
);