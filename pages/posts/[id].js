import { withSSRContext } from "aws-amplify";
import { Customer } from "../../src/models";
import Markdown from "react-markdown";
import { useRouter } from "next/router";

export default function PostComponent({ customer }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Markdown>{customer.firstName}</Markdown>
      <Markdown>{customer.lastName}</Markdown>
      <Markdown>{customer.phoneNumber}</Markdown>
      <Markdown>{customer.address}</Markdown>
      <Markdown>{customer.city}</Markdown>
      <Markdown>{customer.state}</Markdown>
    </div>
  );
}

export async function getStaticPaths(req) {
  const { DataStore } = withSSRContext(req);
  const customers = await DataStore.query(Customer);
  const paths = customers.map((customer) => ({ params: { id: customer.id } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(req) {
  const { DataStore } = withSSRContext(req);
  const { params } = req;
  const { id } = params;
  const customer = await DataStore.query(Customer, id);

  return {
    props: {
      customer: JSON.parse(JSON.stringify(customer)),
    },
    revalidate: 1,
  };
}
