import { SafeAreaView, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

import { useDispatch, useSelector } from 'react-redux'

import { State } from '../types/state'
import { addClip, deleteClip } from '../store/userSlice'
import { ClipButton } from '../components/ClipButton'

const styles = StyleSheet.create({
  container: {
    flex: 1, //　余白全体を使う
    backgroundColor: '#eee',
  },
})

export const ArticleScreen = ({ route }: any) => {
  // 記事情報
  const { article } = route.params

  const dispatch = useDispatch()
  // StoreからClipsを取得
  const clips = useSelector((state: State) => state.user.clips)
  // 記事が既にブックマークされているか
  const isClipped = clips.some((clip) => clip.url === article.url)
  // 記事のブックマーク状態を変更する
  const onPressClip = () => {
    if (isClipped) {
      dispatch(deleteClip(article))
    } else {
      dispatch(addClip(article))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ClipButton
        onPress={() => {
          onPressClip()
        }}
        enabled={isClipped}
      />
      <WebView source={{ uri: article.url }} />
    </SafeAreaView>
  )
}
