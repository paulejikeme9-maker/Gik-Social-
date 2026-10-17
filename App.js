

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';

const COLORS = {
  purple: '#5936D9',
  background: '#F7F6FC',
  white: '#FFFFFF',
  text: '#24213A',
  muted: '#858198',
  border: '#EAE7F3',
};

const initialPosts = [
  {
    id: '1',
    name: 'Amara Okafor',
    handle: '@amara',
    avatar: 'A',
    text: 'A new day is another chance to build something meaningful. Welcome to Gik! 💜',
    likes: 24,
    liked: false,
  },
  {
    id: '2',
    name: 'Tunde James',
    handle: '@tundej',
    avatar: 'T',
    text: 'What is one goal you are working toward this week? Let us encourage one another. ✨',
    likes: 13,
    liked: false,
  },
];

export default function App() {
  const [tab, setTab] = useState('Home');
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState('');

  function toggleLike(id) {
    setPosts(current =>
      current.map(post =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      )
    );
  }

  function publishPost() {
    const message = draft.trim();
    if (!message) return;

    setPosts(current => [
      {
        id: String(Date.now()),
        name: 'You',
        handle: '@you',
        avatar: 'Y',
        text: message,
        likes: 0,
        liked: false,
      },
      ...current,
    ]);

    setDraft('');
    setTab('Home');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>gik<Text style={styles.dot}>.</Text></Text>
          <Text style={styles.tagline}>Your World. Your Gik.</Text>
        </View>
        <Text style={styles.headerIcon}>♡</Text>
      </View>

      {tab === 'Home' && (
        <ScrollView style={styles.page} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Your world, in one place.</Text>
          <Text style={styles.subtitle}>See what your people are sharing.</Text>

          <View style={styles.stories}>
            {['+', 'A', 'T', 'M'].map((letter, index) => (
              <View key={index} style={styles.story}>
                <View style={styles.storyCircle}>
                  <Text style={styles.storyLetter}>{letter}</Text>
                </View>
                <Text style={styles.storyLabel}>
                  {['Your story', 'Amara', 'Tunde', 'Mina'][index]}
                </Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.composer} onPress={() => setTab('Create')}>
            <View style={styles.avatar}><Text style={styles.avatarText}>Y</Text></View>
            <Text style={styles.composerText}>What's happening in your world?</Text>
            <Text style={styles.plus}>＋</Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Your feed</Text>

          {posts.map(post => (
            <View key={post.id} style={styles.post}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.avatar}</Text>
                </View>
                <View style={styles.identity}>
                  <Text style={styles.name}>{post.name}</Text>
                  <Text style={styles.handle}>{post.handle}</Text>
                </View>
                <Text style={styles.more}>•••</Text>
              </View>

              <Text style={styles.postText}>{post.text}</Text>

              <View style={styles.divider} />

              <View style={styles.actions}>
                <Pressable onPress={() => toggleLike(post.id)}>
                  <Text style={[styles.actionText, post.liked && styles.liked]}>
                    {post.liked ? '♥' : '♡'} {post.likes}
                  </Text>
                </Pressable>
                <Text style={styles.actionText}>◯ Comment</Text>
                <Text style={styles.actionText}>↗ Share</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {tab === 'Create' && (
        <View style={styles.page}>
          <View style={styles.content}>
            <Text style={styles.title}>Share your world</Text>
            <Text style={styles.subtitle}>Write something for your community.</Text>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="What's on your mind?"
              placeholderTextColor={COLORS.muted}
              multiline
              maxLength={2000}
              style={styles.input}
            />
            <Pressable style={styles.publishButton} onPress={publishPost}>
              <Text style={styles.publishText}>Publish post</Text>
            </Pressable>
            <Text style={styles.note}>
              This is a local demo. Posts are not shared with other users yet.
            </Text>
          </View>
        </View>
      )}

      {tab === 'Explore' && (
        <View style={styles.center}>
          <Text style={styles.title}>Explore Gik</Text>
          <Text style={styles.subtitle}>Discover people, ideas and communities.</Text>
        </View>
      )}

      {tab === 'Notifications' && (
        <View style={styles.center}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Your updates will appear here.</Text>
        </View>
      )}

      {tab === 'Profile' && (
        <View style={styles.center}>
          <View style={styles.bigAvatar}><Text style={styles.bigAvatarText}>Y</Text></View>
          <Text style={styles.title}>Your Gik profile</Text>
          <Text style={styles.subtitle}>@you</Text>
          <Text style={styles.profileStats}>{posts.filter(p => p.name === 'You').length} posts  ·  0 followers</Text>
          <Text style={styles.note}>Account registration and profile editing are coming next.</Text>
        </View>
      )}

      <View style={styles.nav}>
        {[
          ['Home', '⌂'],
          ['Explore', '⌕'],
          ['Create', '+'],
          ['Notifications', '♡'],
          ['Profile', '◉'],
        ].map(([name, icon]) => (
          <Pressable
            key={name}
            onPress={() => setTab(name)}
            style={styles.navItem}
          >
            <Text style={[styles.navIcon, tab === name && styles.navActive]}>
              {icon}
            </Text>
            <Text style={[styles.navLabel, tab === name && styles.navActive]}>
              {name}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: { fontSize: 32, fontWeight: '900', color: COLORS.purple },
  dot: { color: '#F0A52B' },
  tagline: { color: COLORS.muted, fontSize: 10, marginTop: -4 },
  headerIcon: { fontSize: 27, color: COLORS.purple },
  page: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 28 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.muted, marginTop: 6, marginBottom: 18 },
  stories: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  story: { alignItems: 'center' },
  storyCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#EAE4FF', borderWidth: 2, borderColor: '#927BEA',
    alignItems: 'center', justifyContent: 'center',
  },
  storyLetter: { color: COLORS.purple, fontSize: 20, fontWeight: '800' },
  storyLabel: { color: COLORS.muted, fontSize: 10, marginTop: 5 },
  composer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 15,
    padding: 12, marginBottom: 20,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAE4FF',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: COLORS.purple, fontWeight: '800', fontSize: 16 },
  composerText: { flex: 1, color: COLORS.muted, fontSize: 12, marginLeft: 10 },
  plus: { fontSize: 25, color: COLORS.purple },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  post: {
    backgroundColor: COLORS.white, borderRadius: 17, padding: 14,
    marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  identity: { flex: 1, marginLeft: 10 },
  name: { fontSize: 13, fontWeight: '800', color: COLORS.text },
  handle: { fontSize: 11, color: COLORS.muted, marginTop: 3 },
  more: { color: COLORS.muted, fontSize: 16 },
  postText: { fontSize: 14, lineHeight: 21, color: '#39364D', marginVertical: 15 },
  divider: { height: 1, backgroundColor: COLORS.border },
  actions: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 },
  actionText: { fontSize: 12, color: COLORS.muted, fontWeight: '600' },
  liked: { color: '#E04475' },
  input: {
    backgroundColor: COLORS.white, minHeight: 180, borderRadius: 15,
    padding: 14, textAlignVertical: 'top', fontSize: 15,
    color: COLORS.text, borderWidth: 1, borderColor: COLORS.border,
  },
  publishButton: {
    backgroundColor: COLORS.purple, borderRadius: 13,
    padding: 15, alignItems: 'center', marginTop: 14,
  },
  publishText: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
  note: { color: COLORS.muted, fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 20 },
  center: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  bigAvatar: {
    width: 86, height: 86, borderRadius: 43, backgroundColor: '#EAE4FF',
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  bigAvatarText: { color: COLORS.purple, fontSize: 32, fontWeight: '900' },
  profileStats: { color: COLORS.muted, marginTop: 15, fontSize: 13 },
  nav: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 9, paddingBottom: 8,
  },
  navItem: { flex: 1, alignItems: 'center', gap: 3 },
  navIcon: { fontSize: 22, color: '#9290A5' },
  navLabel: { fontSize: 9, color: '#9290A5' },
  navActive: { color: COLORS.purple, fontWeight: '800' },
});
  
