import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="desription"
          content="Browse a huge list of hihgly active React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
export default HomePage;
export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://abuvbu:abuVBU_1988@cluster0.0w7u0to.mongodb.net/meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
