import Image from "next/image"
import styles from "./avatar.module.css"

interface AvatarProps {
  src: string
  alt: string
}

export function Avatar({ src, alt }: AvatarProps) {
  return (
    <div className={styles.container}>
      <Image src={src || "/placeholder.svg"} alt={alt} width={40} height={40} className={styles.image} />
    </div>
  )
}

