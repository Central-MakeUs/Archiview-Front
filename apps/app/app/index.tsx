import { SafeAreaView } from 'react-native-safe-area-context';

import { WebView, emitAppReady } from '@/bridge';

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: 'https://archiview.space/' }}
        javaScriptEnabled
        domStorageEnabled
        // 중요: iOS에서 리다이렉트/쿠키/세션 꼬이면 여기서 터짐
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        onLoadStart={(e) => console.log('loadStart', e.nativeEvent.url)}
        onLoadEnd={(e) => {
          console.log('loadEnd', e.nativeEvent.url);
          emitAppReady();
        }}
        onNavigationStateChange={(nav) => console.log('nav', nav.url)}
        onHttpError={(e) =>
          console.log(
            'httpError',
            e.nativeEvent.statusCode,
            e.nativeEvent.description,
            e.nativeEvent.url,
          )
        }
        onError={(e) => console.log('error', e.nativeEvent)}
      />
    </SafeAreaView>
  );
}
