import styles from "../styles/Home.module.css";
import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import { Customer } from "./src/models/index";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    async function fetchPosts() {
      const postData = await DataStore.query(Customer);
      setPosts(postData);
    }
    const subscription = DataStore.observe(Customer).subscribe(() =>
      fetchPosts()
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {console.log(posts)}
      {posts.map((post) => (
        // eslint-disable-next-line react/jsx-key
        <ul>
          <li key={post.id}>{post.firstName}</li>
        </ul>
      ))}
    </div>
  );
}
