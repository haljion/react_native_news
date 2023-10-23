import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native'

/**
 * @param {
 * imageUrl: 画像URL(string)
 * title: タイトル(string)
 * author: ニュース提供元(string)
 * onPress: タップされたときのイベント
 * } props
 * @returns
 */
export const ListItem = (props: {
  imageUrl: string
  title: string
  author: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}) => {
  return (
    // タッチ検知領域
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      <View style={styles.leftContainer}>
        <Image
          style={{ width: 100, height: 100 }}
          // Web上から取得
          source={{ uri: props.imageUrl }}
        />
      </View>
      <View style={styles.rightContainer}>
        {/* Textタグの中にのみ直接文字列を記入できる */}
        {/* numberOfLines: 指定行数以上をで表示 */}
        <Text numberOfLines={3} style={styles.text}>
          {props.title}
        </Text>
        <Text style={styles.subText}>{props.author}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row', //コンテンツの並び順
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  leftContainer: { width: 100 },
  rightContainer: { flex: 1, padding: 10, justifyContent: 'space-between' },
  text: { fontSize: 16 },
  subText: { fontSize: 12, color: 'gray' },
})
