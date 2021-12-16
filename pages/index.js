import styles from "../styles/Home.module.css";
import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Customer } from "../src/models";

export default function Home() {
  const [posts, setPosts] = useState([]);

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
      <h1>Posts</h1>
      {console.log(posts)}

      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a>
            <h2>{post.title}</h2>
          </a>
        </Link>
      ))}
    </div>
  );
}
