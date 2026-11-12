import React, { useState } from 'react';
import { 
  MessageSquare, ThumbsUp, Eye, Pin, Plus, Mail, 
  ChevronDown, Send, CornerDownRight, Tag 
} from 'lucide-react';
import { MOCK_COMMUNITY_POSTS, CommunityPost } from '../../data/mockData';

export const CommunityView: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [filter, setFilter] = useState<'전체' | '공지' | '전략토론' | 'API질답' | '알고리즘팁'>('전체');
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'전략토론' | 'API질답' | '알고리즘팁'>('전략토론');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<{ [postId: string]: string }>({});
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});

  const filteredPosts = posts.filter((p) => {
    if (filter === '전체') return true;
    return p.category === filter;
  });

  const handleTogglePost = (id: string) => {
    setExpandedPostId((prev) => {
      if (prev === id) return null;
      // Increment view count when opening
      setPosts((currentPosts) =>
        currentPosts.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p))
      );
      return id;
    });
  };

  const handleLikePost = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isLiked = likedPosts[id];
    setLikedPosts((prev) => ({ ...prev, [id]: !isLiked }));
    setPosts((currentPosts) =>
      currentPosts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p
      )
    );
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = newCommentText[postId]?.trim();
    if (!commentText) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: '스피드퀀트봇',
      league: '챌린저',
      date: '방금 전',
      text: commentText,
    };

    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id !== postId) return p;
        const updatedComments = [...(p.comments || []), newComment];
        return {
          ...p,
          comments: updatedComments,
          commentsCount: updatedComments.length,
        };
      })
    );

    setNewCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPostId = `post-${Date.now()}`;
    const newPost: CommunityPost = {
      id: newPostId,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim() || '내용이 등록되었습니다.',
      author: '스피드퀀트봇',
      league: '챌린저',
      date: '방금 전',
      views: 1,
      likes: 0,
      commentsCount: 0,
      comments: [],
      tags: [newCategory],
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsWriting(false);
    setExpandedPostId(newPostId);
  };

  const renderFormattedContent = (content: string) => {
    if (!content) return null;
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const firstLine = lines[0];
        const isLang = ['python', 'bash', 'json', 'ts', 'js'].includes(firstLine.toLowerCase());
        const code = isLang ? lines.slice(1).join('\n') : lines.join('\n');
        return (
          <pre key={idx} className="my-3 p-4 rounded-xl bg-black/80 border border-purple-900/60 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto">
            <code>{code}</code>
          </pre>
        );
      }
      return (
        <p key={idx} className="whitespace-pre-line text-sm sm:text-base text-slate-200 leading-relaxed my-1">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white tracking-tight">
            커뮤니티 & 기술 Q&A
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1">
            OPEN API 알고리즘 전략 노하우 공유 및 초고속 주문 튜닝 기술 토론 포럼입니다.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold rounded-xl text-sm font-racing flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-md shadow-yellow-500/20"
        >
          <Plus size={16} />
          <span>{isWriting ? '작성 취소' : '새 글 작성'}</span>
        </button>
      </div>

      {/* Writing Box (Collapsible) */}
      {isWriting && (
        <form onSubmit={handleCreatePost} className="mb-8 p-6 rounded-2xl bg-[#0f0926] border border-yellow-500/40 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-slate-200">카테고리:</span>
            {(['전략토론', 'API질답', '알고리즘팁'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer ${
                  newCategory === cat
                    ? 'bg-yellow-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="제목을 입력하세요 (예: 파이썬 주문 시그널 최적화 질문)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-[#080415] border border-purple-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400 placeholder:text-slate-500 font-medium"
          />

          <textarea
            rows={4}
            placeholder="게시글 내용을 입력하세요 (전략 설명, 코드 예시, 질문 사항 등)"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-[#080415] border border-purple-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400 placeholder:text-slate-500 resize-none font-sans"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-xl cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-slate-950 text-sm font-racing font-extrabold rounded-xl cursor-pointer transition-colors"
            >
              게시글 등록
            </button>
          </div>
        </form>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-purple-900/60 pb-3.5 overflow-x-auto">
        {(['전체', '공지', '전략토론', 'API질답', '알고리즘팁'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer shrink-0 ${
              filter === cat
                ? 'bg-yellow-400 text-slate-950 font-racing'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-3 mb-8">
        {filteredPosts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          const isLiked = !!likedPosts[post.id];

          return (
            <div
              key={post.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                post.isPinned
                  ? 'bg-purple-950/40 border-yellow-500/50 shadow-lg'
                  : 'bg-[#0f0926]/90 border-purple-950/80 shadow-md'
              } ${isExpanded ? 'border-yellow-400/80 ring-1 ring-yellow-400/30' : 'hover:border-purple-700'}`}
            >
              {/* Card Header / Summary Click Area */}
              <div
                onClick={() => handleTogglePost(post.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-purple-950/20 transition-colors"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {post.isPinned ? (
                    <div className="w-7 h-7 rounded-lg bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Pin size={15} />
                    </div>
                  ) : (
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#170e3a] text-purple-300 border border-purple-800/80 shrink-0 mt-0.5 font-racing">
                      {post.category}
                    </span>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-base sm:text-lg font-bold transition-colors break-keep-all leading-snug ${
                      isExpanded ? 'text-yellow-400' : 'text-white hover:text-yellow-300'
                    }`}>
                      {post.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
                      <span className="text-slate-300 font-semibold">{post.author}</span>
                      <span>·</span>
                      <span className="text-yellow-400 font-bold">{post.league}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                      {isExpanded && (
                        <span className="text-xs text-yellow-400 font-semibold ml-1 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">
                          상세 열림
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400 self-end sm:self-auto shrink-0 font-medium">
                  <span className="flex items-center gap-1.5" title="조회수">
                    <Eye size={15} />
                    <span>{post.views}</span>
                  </span>
                  <span 
                    onClick={(e) => handleLikePost(e, post.id)}
                    className={`flex items-center gap-1.5 transition-colors p-1 rounded-md hover:bg-purple-900/40 cursor-pointer ${
                      isLiked ? 'text-rose-400 font-bold' : 'hover:text-slate-200'
                    }`} 
                    title="좋아요"
                  >
                    <ThumbsUp size={15} className={isLiked ? 'fill-rose-400 text-rose-400' : ''} />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-yellow-400 font-bold" title="댓글">
                    <MessageSquare size={15} />
                    <span>{post.commentsCount}</span>
                  </span>
                  <div className={`p-1.5 rounded-lg bg-purple-900/40 text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-yellow-400 bg-yellow-400/20' : ''
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Expanded Detail Content Area */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-purple-900/50 bg-[#090518]/90">
                  {/* Post Content */}
                  <div className="py-3 text-slate-200 leading-relaxed font-sans">
                    {renderFormattedContent(post.content)}
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 pb-4 border-b border-purple-950/80">
                      <Tag size={13} className="text-yellow-400" />
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-950/80 text-purple-300 border border-purple-800/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Comments Thread Section */}
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <MessageSquare size={16} className="text-yellow-400" />
                        <span>댓글 및 의견 ({post.comments?.length || 0})</span>
                      </h5>
                      <span className="text-xs text-slate-400 font-mono">실시간 토론</span>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-2.5">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs sm:text-sm"
                          >
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-200">{comment.author}</span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                                  {comment.league}
                                </span>
                              </div>
                              <span className="font-mono text-slate-500">{comment.date}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed pl-1">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-2 italic text-center">
                          아직 작성된 댓글이 없습니다. 첫 번째 의견을 남겨보세요!
                        </p>
                      )}
                    </div>

                    {/* Comment Input Form */}
                    <form
                      onSubmit={(e) => handleAddComment(e, post.id)}
                      className="flex items-center gap-2 pt-2"
                    >
                      <div className="relative flex-1">
                        <CornerDownRight size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="의견이나 추가 팁을 댓글로 남겨보세요..."
                          value={newCommentText[post.id] || ''}
                          onChange={(e) =>
                            setNewCommentText({
                              ...newCommentText,
                              [post.id]: e.target.value,
                            })
                          }
                          className="w-full pl-9 pr-4 py-2.5 bg-[#080415] border border-purple-900/60 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!newCommentText[post.id]?.trim()}
                        className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-slate-950 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                      >
                        <Send size={14} />
                        <span>등록</span>
                      </button>
                    </form>

                    {/* Bottom Collapse Toggle */}
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePost(post.id)}
                        className="text-xs text-slate-400 hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors font-medium py-1 px-3 rounded-lg hover:bg-purple-950/40"
                      >
                        <span>접기</span>
                        <ChevronDown size={14} className="rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Developer Support Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#12082f] to-[#0c061e] border border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base sm:text-lg font-racing text-white flex items-center gap-2">
            <Mail size={18} className="text-yellow-400" />
            <span>LS증권 OPEN API 공식 기술 지원팀 데스크</span>
          </h4>
          <p className="text-sm text-slate-300 mt-1">
            웹소켓 핑퐁, 파이썬 패키지 연동 등 기술 지원은 전담 엔지니어가 평일 1:1 지원합니다.
          </p>
        </div>
        <span className="font-mono text-sm text-yellow-400 font-bold bg-slate-950 px-3.5 py-2 rounded-xl border border-purple-900/60 shrink-0">
          openapi@ls-sec.co.kr
        </span>
      </div>
    </div>
  );
};

