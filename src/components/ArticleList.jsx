import { useState, useEffect } from 'react';
import { useGetAllPostsQuery, useGetAllDraftsQuery, useGetPostByIdQuery, useGetDraftByIdQuery } from '../api/postsAPI';
import styles from "../styles/ArticleCard.module.css";
import ArticleCard from "./ArticleCard";
import * as allTags from "react-bootstrap/ElementChildren";

const PAGE_SIZE = 21;

const ArticleList = ({ type = "published" }) => {
    const [page, setPage] = useState(1);
    const [allArticles, setAllArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const [selectedTags, setSelectedTags] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [idFilter, setIdFilter] = useState('');

    const [loadByIdMode, setLoadByIdMode] = useState(false);
    const [isLoadingById, setIsLoadingById] = useState(false);
    const [articleById, setArticleById] = useState(null);
    const [idError, setIdError] = useState(null);

    const {
        data: postsData,
        isLoading: postsLoading,
        error: postsError
    } = useGetAllPostsQuery({ page, limit: PAGE_SIZE }, { skip: type !== "published" || loadByIdMode });

    const {
        data: draftsData,
        isLoading: draftsLoading,
        error: draftsError
    } = useGetAllDraftsQuery({ page, limit: PAGE_SIZE }, { skip: type !== "drafts" || loadByIdMode });

    const {
        data: postByIdData,
        isLoading: postByIdLoading,
        error: postByIdError
    } = useGetPostByIdQuery(idFilter, { skip: type !== "published" || !loadByIdMode || !idFilter });

    const {
        data: draftByIdData,
        isLoading: draftByIdLoading,
        error: draftByIdError
    } = useGetDraftByIdQuery(idFilter, { skip: type !== "drafts" || !loadByIdMode || !idFilter });

    const isLoading = type === "published" ? postsLoading : draftsLoading;
    const error = type === "published" ? postsError : draftsError;
    const currentData = type === "published" ? postsData : draftsData;

    useEffect(() => {
        if (currentData && !loadByIdMode) {
            const newArticles = currentData.items || [];

            setAllArticles(prev => {
                const existingIds = new Set(prev.map(a => a.id));
                const uniqueNewArticles = newArticles.filter(a => !existingIds.has(a.id));
                return [...prev, ...uniqueNewArticles];
            });

            setHasMore(newArticles.length === PAGE_SIZE);
        }
    }, [currentData, loadByIdMode]);

    useEffect(() => {
        if (loadByIdMode) {
            setFilteredArticles(articleById ? [articleById] : []);
            return;
        }

        let filtered = [...allArticles];

        if (selectedTags.length > 0) {
            filtered = filtered.filter(article =>
                (article.tags || []).some(tag => selectedTags.includes(tag))
            );
        }

        if (dateFilter) {
            const filterDate = new Date(dateFilter).toDateString();
            filtered = filtered.filter(article => {
                const articleDate = new Date(article.published_at || article.created_at).toDateString();
                return articleDate === filterDate;
            });
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(query)
            );
        }

        setFilteredArticles(filtered);
    }, [allArticles, selectedTags, dateFilter, searchQuery, loadByIdMode, articleById]);

    useEffect(() => {
        if (loadByIdMode) {
            if (type === "published" && postByIdData) {
                setArticleById(postByIdData);
                setIdError(null);
            } else if (type === "drafts" && (draftByIdData)) {
                setArticleById(draftByIdData);
                setIdError(null);
            }

            if (postByIdError || draftByIdError) {
                setIdError(postByIdError?.message || draftByIdError?.message || 'Article not found');
                setArticleById(null);
            }
        }
    }, [postByIdData, draftByIdData, postByIdError, draftByIdError, loadByIdMode, type]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleLoadById = () => {
        if (!idFilter) return;
        setIsLoadingById(true);
        setLoadByIdMode(true);
    };

    const resetFilters = () => {
        setLoadByIdMode(false);
        setSelectedTags([]);
        setDateFilter('');
        setSearchQuery('');
        setIdFilter('');
        setArticleById(null);
        setIdError(null);
        setIsLoadingById(false);
    };

    if (isLoading && page === 1 && !loadByIdMode) {
        return <div className={styles.articlesContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.articlesContainer}>Error: {error.message || 'Failed to load articles'}</div>;
    }

    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <>
        <div className={styles.articlesContainer}>
            <div className={styles.filterControls}>
                <div className={styles.filterGroup}>
                    <button
                        onClick={() => setLoadByIdMode(!loadByIdMode)}
                        className={`${styles.toggleModeButton} ${loadByIdMode ? styles.activeMode : ''}`}
                    >
                        {loadByIdMode ? 'Show All Articles' : 'Load by ID'}
                    </button>
                </div>

                {loadByIdMode ? (
                    <div className={styles.filterGroup}>
                        <label htmlFor="idFilter">Article ID:</label>
                        <input
                            id="idFilter"
                            type="text"
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                            placeholder="Enter article ID..."
                        />
                        <button
                            onClick={handleLoadById}
                            disabled={!idFilter || isLoadingById}
                            className={styles.loadByIdButton}
                        >
                            {isLoadingById ? 'Loading...' : 'Load Article'}
                        </button>
                        {idError && <div className={styles.errorMessage}>{idError}</div>}
                    </div>
                ) : (
                    <>
                        <div className={styles.filterGroup}>
                            <label htmlFor="search">Search by Title:</label>
                            <input
                                id="search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter title..."
                            />
                        </div>

                        <div className={styles.filterGroup}>
                            <label htmlFor="date">Filter by Date:</label>
                            <input
                                id="date"
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                            {dateFilter && (
                                <button
                                    onClick={() => setDateFilter('')}
                                    className={styles.clearFilter}
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className={styles.filterGroup}>
                            <label>Filter by Tags:</label>
                            <div className={styles.tagsFilter}>
                                {allTags.map(tag => (
                                    <span
                                        key={tag}
                                        className={`${styles.tagFilter} ${selectedTags.includes(tag) ? styles.selectedTag : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={() => setSelectedTags([])}
                                        className={styles.clearFilter}
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {(loadByIdMode || selectedTags.length > 0 || dateFilter || searchQuery) && (
                    <button
                        onClick={resetFilters}
                    >
                        Reset All Filters
                    </button>
                )}
            </div>

            {filteredArticles.length > 0 ? (
                <>
                    {filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                    {hasMore && !loadByIdMode && !selectedTags.length && !dateFilter && !searchQuery && (
                        <button
                            onClick={loadMore}
                            disabled={isLoading}
                            className={styles.loadMoreButton}
                        >
                            {isLoading ? 'Loading...' : 'Load More'}
                        </button>
                    )}
                </>
            ) : (
                <div className={styles.noResults}>
                    {loadByIdMode
                        ? (idError || 'No article found with this ID')
                        : 'No articles match your filters.'
                    }
                </div>
            )}
        </div>
        </>
    );
};

export default ArticleList;