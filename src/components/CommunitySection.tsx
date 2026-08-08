import React, { useState } from 'react';
import { CommunityPost } from '../types';
import { Users, Heart, MapPin, Sparkles, MessageCircle, Share2, Send } from 'lucide-react';

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    userName: 'Aria Chen',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    actionTitle: 'Planted 15 native eucalyptus saplings in Sydney parkland!',
    co2Impact: '330 kg CO₂ / yr',
    timeAgo: '12 mins ago',
    likes: 42,
    location: 'Sydney, Australia'
  },
  {
    id: 'post-2',
    userName: 'Liam Thorne',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    actionTitle: 'Completed a 25km zero-emission electric bike commute.',
    co2Impact: '12.5 kg CO₂ saved',
    timeAgo: '45 mins ago',
    likes: 28,
    location: 'London, UK'
  },
  {
    id: 'post-3',
    userName: 'Sofia Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    actionTitle: 'Organized neighborhood beach cleanup: 45kg plastic removed!',
    co2Impact: '180 kg CO₂ saved',
    timeAgo: '2 hours ago',
    likes: 89,
    location: 'Barcelona, Spain'
  }
];

export const CommunitySection: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');

  const handleLike = (id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      userName: 'Eco Guardian (You)',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      actionTitle: newPostText,
      co2Impact: '15.0 kg CO₂ saved',
      timeAgo: 'Just now',
      likes: 1,
      hasLiked: true,
      location: 'Global Biosphere'
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Global Eco Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Community Impact Feed
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Connect with millions of eco champions taking daily action to restore our planet.
        </p>
      </div>

      {/* Create Action Post Form */}
      <form onSubmit={handleCreatePost} className="p-5 rounded-2xl glass-panel-dark border border-lime-500/30">
        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
            alt="Your Avatar"
            className="w-10 h-10 rounded-full border border-lime-400/40 object-cover"
          />
          <div className="flex-1 space-y-3">
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share an eco action you took today (e.g. avoided plastic, rode bike, planted seeds)..."
              rows={2}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-lime-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +15 pts for sharing
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Post Action</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-2xl glass-panel-dark border border-white/10 hover:border-lime-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{post.userName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-lime-400" /> {post.location}
                    </span>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs font-bold">
                {post.co2Impact}
              </span>
            </div>

            <p className="text-sm text-slate-200 mb-4 leading-relaxed">
              {post.actionTitle}
            </p>

            <div className="flex items-center gap-6 pt-3 border-t border-white/10 text-xs font-bold text-slate-400">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  post.hasLiked ? 'text-rose-400 font-extrabold' : 'hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current text-rose-400' : ''}`} />
                <span>{post.likes} Likes</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>Reply</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ml-auto">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
