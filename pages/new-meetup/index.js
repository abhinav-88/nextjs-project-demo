// our-domain.com/new-meetup
import NewMeetupFrom from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="desription"
          content="Add your own meetups and creat amazing networking opportunities."
        />
      </Head>
      <NewMeetupFrom onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetupPage;
