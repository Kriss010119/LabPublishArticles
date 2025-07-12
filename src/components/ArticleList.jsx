import styles from "../styles/ArticleCard.module.css";
import ArticleCard from "./ArticleCard";

const ArticleList = ({state = "published"}) => {
    const articles = [
        {
            id: 1,
            title: "Task 1",
            content: "Hello my name is Task 1! I want to help you to see how it is. La la la",
            status: "draft",
            tags: ["cool", "info", "fun"],
            created_at: "",
            updated_at: "",
            published_at: ""
        },
        {
            id: 2,
            title: "Task 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
            status: "published",
            tags: ["lorem", "text", "fun"],
            created_at: "12.07.2025",
            updated_at: "13.07.2025",
            published_at: "13:45 13.07.2025"
        },
        {
            id: 1,
            title: "Task 1",
            content: "Hello my name is Task 1! I want to help you to see how it is. La la la",
            status: "draft",
            tags: ["cool", "info", "fun"],
            created_at: "",
            updated_at: "",
            published_at: ""
        },
        {
            id: 2,
            title: "Task 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
            status: "published",
            tags: ["lorem", "text", "fun"],
            created_at: "12.07.2025",
            updated_at: "13.07.2025",
            published_at: "13:45 13.07.2025"
        },
        {
            id: 1,
            title: "Task 1",
            content: "Hello my name is Task 1! I want to help you to see how it is. La la la",
            status: "draft",
            tags: ["cool", "info", "fun"],
            created_at: "",
            updated_at: "",
            published_at: ""
        },
        {
            id: 2,
            title: "Task 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
            status: "published",
            tags: ["lorem", "text", "fun"],
            created_at: "12.07.2025",
            updated_at: "13.07.2025",
            published_at: "13:45 13.07.2025"
        },
        {
            id: 1,
            title: "Task 1",
            content: "Hello my name is Task 1! I want to help you to see how it is. La la la",
            status: "draft",
            tags: ["cool", "info", "fun"],
            created_at: "",
            updated_at: "",
            published_at: ""
        },
        {
            id: 2,
            title: "Task 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
            status: "published",
            tags: ["lorem", "text", "fun"],
            created_at: "12.07.2025",
            updated_at: "13.07.2025",
            published_at: "13:45 13.07.2025"
        },
        {
            id: 1,
            title: "Task 1",
            content: "Hello my name is Task 1! I want to help you to see how it is. La la la",
            status: "draft",
            tags: ["cool", "info", "fun"],
            created_at: "",
            updated_at: "",
            published_at: ""
        },
        {
            id: 2,
            title: "Task 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
            status: "published",
            tags: ["lorem", "text", "fun"],
            created_at: "12.07.2025",
            updated_at: "13.07.2025",
            published_at: "13:45 13.07.2025"
        }
    ];

    return (
        <div className={styles.articlesContainer}>
            {articles.map(article => (
                <>
                {(article.status === state) && <ArticleCard key={article.id} article={article} />}
                </>
            ))}
        </div>
    );
};

export default ArticleList;