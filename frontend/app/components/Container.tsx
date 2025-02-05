import styles from "../styles/page.module.css";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.page}>
    {children}
    </div>;
}
