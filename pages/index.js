import styles from "../styles/Home.module.css";
import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Customer } from "../src/models";

export default function Home() {
  const [customers, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postData = await DataStore.query(Customer);
      setPosts(postData);
    }
    fetchPosts();

    const subscription = DataStore.observe(Customer).subscribe(() =>
      fetchPosts()
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Pizza Restaurant</h1>
<h2>These are my customers:</h2>

      {customers.map((customer) => (
        <Link key={customer.id} href={`/posts/${customer.id}`}>
          <a>
            <h2>{customer.firstName}</h2>
          </a>
        </Link>
      ))}
    </div>
  );
}
