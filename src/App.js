import React, {Component} from "react";
import Fuse from "fuse.js";
import * as hangul from "hangul-js";

const DATA = [
    "가나 - 아크라",
    "가봉 - 리브르빌",
    "가이아나 - 조지타운",
    "감비아 - 반줄",
    "괌 - 하갓냐",
    "과테말라 - 과테말라",
    "그레나다 - 세인트조지스",
    "그리스 - 아테네",
    "기니 - 코나크리",
    "기니비사우 - 비사우",
    "나미비아 - 빈트후크",
    "나우루 - 야렌",
    "나이지리아 - 아부자",
    "남수단 - 주바",
    "남아프리카 공화국 - 프리토리아(행정), 블룸폰테인(사법), 케이프타운(입법)",
    "남오세티야 - 츠힌발리",
    "네덜란드 - 암스테르담",
    "네팔 - 카트만두",
    "노르웨이 - 오슬로",
    "뉴질랜드 - 웰링턴",
    "니우에 - 알로피",
    "니제르 - 니아메",
    "니카라과 - 마나과",
    "대한민국 - 서울",
    "덴마크 - 코펜하겐",
    "도미니카 - 로조",
    "도미니카 공화국 - 산토도밍고",
    "독일 - 베를린",
    "동티모르 - 딜리",
    "라오스 - 비엔티안",
    "라이베리아 - 몬로비아",
    "라트비아 - 리가",
    "러시아 - 모스크바",
    "레바논 - 베이루트",
    "레소토 - 마세루",
    "루마니아 - 부쿠레슈티",
    "룩셈부르크 - 룩셈부르크",
    "르완다 - 키갈리",
    "리비아 - 트리폴리",
    "리투아니아 - 빌뉴스",
    "리히텐슈타인 - 파두츠",
    "마다가스카르 - 안타나나리보",
    "마셜 제도 - 마주로",
    "마카오 - 마카우",
    "마케도니아 공화국 - 스코페",
    "말라위 - 릴롱궤",
    "말레이시아 - 쿠알라룸푸르",
    "말리 - 바마코",
    "멕시코 - 멕시코시티",
    "모나코 - 모나코",
    "모로코 - 라바트(입법), 카사블랑카(행정)",
    "모리셔스 - 포트루이스",
    "모리타니 - 누악쇼트",
    "모잠비크 - 마푸투",
    "몬테네그로 - 포드고리차",
    "몰도바 - 키시너우",
    "몰디브 - 말레",
    "몰타 - 발레타",
    "몽골 - 울란바토르",
    "미국 - 워싱턴 D.C.",
    "미얀마 - 네피도",
    "미크로네시아 연방 - 팔리키르",
    "바누아투 - 포트빌라",
    "바레인 - 마나마",
    "바베이도스 - 브리지타운",
    "바티칸 시국 - 바티칸",
    "바하마 - 나소",
    "방글라데시 - 다카",
    "베냉 - 포르토노보",
    "베네수엘라 - 카라카스",
    "베트남 - 하노이",
    "벨기에 - 브뤼셀",
    "벨라루스 - 민스크",
    "벨리즈 - 벨모판(행정), 벨리즈시티(사실상)",
    "보스니아 헤르체고비나 - 사라예보",
    "보츠와나 - 가보로네",
    "볼리비아 - 수크레(헌법 상), 라파스(행정)",
    "부룬디 - 부줌부라",
    "부르키나파소 - 와가두구",
    "부탄 - 팀푸",
    "북마리아나 제도 - 사이판 섬(주장)[1]",
    "북키프로스 - 니코시아[2]",
    "불가리아 - 소피아",
    "브라질 - 브라질리아",
    "브루나이 - 반다르스리브가완",
    "사모아 - 아피아",
    "사우디아라비아 - 리야드",
    "사하라 아랍 민주 공화국 - 엘아이운(법상), 티파리티 및 사하라 난민 캠프(사실상)",
    "산마리노 - 산마리노",
    "상투메 프린시페 - 상투메",
    "세네갈 - 다카르",
    "세르비아 - 베오그라드",
    "세이셸 - 빅토리아",
    "세인트루시아 - 캐스트리스",
    "세인트빈센트 그레나딘 - 킹스타운",
    "세인트키츠 네비스 - 바스테르",
    "소말리아 - 모가디슈",
    "소말릴란드 - 하르게이사",
    "솔로몬 제도 - 호니아라",
    "수단 - 하르툼",
    "수리남 - 파라마리보",
    "스리랑카 - 스리자야와르데네푸라코테(사실상), 콜롬보(행정)",
    "스웨덴 - 스톡홀름",
    "스위스 - 베른",
    "스페인 - 마드리드",
    "슬로바키아 - 브라티슬라바",
    "슬로베니아 - 류블랴나",
    "시리아 - 다마스쿠스",
    "시에라리온 - 프리타운",
    "싱가포르 - 싱가포르",
    "아랍에미리트 - 아부다비(입법), 두바이(행정)",
    "아르메니아 - 예레반",
    "아르차흐 공화국 - 스테파나케르트",
    "아르헨티나 - 부에노스아이레스",
    "아이슬란드 - 레이캬비크",
    "아이티 - 포르토프랭스",
    "아일랜드 - 더블린",
    "아제르바이잔 - 바쿠",
    "아프가니스탄 - 카불",
    "안도라 - 안도라라베야",
    "알바니아 - 티라나",
    "알제리 - 알제",
    "압하지야 - 수후미",
    "앙골라 - 루안다",
    "앤티가 바부다 - 세인트존스",
    "에리트레아 - 아스마라",
    "에스와티니 - 음바바네(행정), 로밤바(입법)",
    "에스토니아 - 탈린",
    "에콰도르 - 키토(행정), 과야킬(입법)",
    "에티오피아 - 아디스아바바",
    "엘살바도르 - 산살바도르",
    "영국 - 런던",
    "예멘 - 사나",
    "오만 - 무스카트",
    "오스트레일리아 - 캔버라",
    "오스트리아 - 비엔나",
    "온두라스 - 테구시갈파",
    "요르단 - 암만",
    "우간다 - 캄팔라",
    "우루과이 - 몬테비데오",
    "우즈베키스탄 - 타슈켄트",
    "우크라이나 - 키예프",
    "웨일즈 - 카디프",
    "이라크 - 바그다드",
    "이란 - 테헤란",
    "이스라엘 - 예루살렘(행정), 텔아비브(입법)",
    "이집트 - 카이로",
    "이탈리아 - 로마",
    "인도 - 뉴델리(입법), 뭄바이(행정)",
    "인도네시아 - 자카르타",
    "일본 - 도쿄",
    "자메이카 - 킹스턴",
    "잠비아 - 루사카",
    "적도 기니 - 말라보",
    "조선민주주의인민공화국 - 평양",
    "조지아 - 트빌리시",
    "중앙아프리카 공화국 - 방기",
    "중화민국 - 타이베이",
    "중화인민공화국 - 베이징",
    "지부티 - 지부티",
    "짐바브웨 - 하라레",
    "차드 - 은자메나",
    "체코 - 프라하",
    "칠레 - 산티아고",
    "카메룬 - 야운데",
    "카보베르데 - 프라이아",
    "카자흐스탄 - 아스타나",
    "카타르 - 도하",
    "캄보디아 - 프놈펜",
    "캐나다 - 오타와",
    "케냐 - 나이로비",
    "코모로 - 모로니",
    "코소보 - 프리슈티나",
    "코스타리카 - 산호세",
    "코트디부아르 - 야무수크로",
    "콜롬비아 - 보고타",
    "콩고 공화국 - 브라자빌",
    "콩고 민주 공화국 - 킨샤사",
    "쿠바 - 아바나",
    "쿠웨이트 - 쿠웨이트",
    "크로아티아 - 자그레브",
    "키르기스스탄 - 비슈케크",
    "키리바시 - 타라와",
    "키프로스 - 니코시아",
    "타지키스탄 - 두샨베",
    "탄자니아 - 도도마",
    "태국 - 방콕",
    "터키 - 앙카라",
    "토고 - 로메",
    "통가 - 누쿠알로파",
    "투르크메니스탄 - 아슈하바트",
    "투발루 - 푸나푸티",
    "튀니지 - 튀니스",
    "트란스니스트리아 - 티라스폴",
    "트리니다드 토바고 - 포트오브스페인",
    "파나마 - 파나마",
    "파라과이 - 아순시온",
    "파키스탄 - 이슬라마바드",
    "파푸아뉴기니 - 포트모르즈비",
    "팔라우 - 멜레케오크",
    "팔레스타인 - 라말라(사실상) / 예루살렘(주장), 요르단 강 서안 지구 / 가자 지구",
    "페루 - 리마",
    "포르투갈 - 리스본",
    "폴란드 - 바르샤바",
    "프랑스 - 파리",
    "피지 - 수바",
    "핀란드 - 헬싱키",
    "필리핀 - 마닐라",
    "헝가리 - 부다페스트",
    "홍콩 - 중시 구"
].map(d => {
    const ss = d.split(" - ");
    return {
        country: ss[0],
        capital: ss[1],
        h0: hangul
            .d(ss[0], true)
            .map(s => s[0])
            .join(""),
        h1: hangul.d(ss[0]).join("")
    };
});
const options = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 10,
    minMatchCharLength: 1,
    keys: ["country", "h1"] // TODO "h0" 초성만으로 검색하기
};

let fuse = new Fuse(DATA, options);

function highlight(str, ind, normalize = false) {
    const charGroup = str.split('').map(c => hangul.d(c));
    const ranks = new Array(charGroup.length).fill(0);

    ind.forEach(([start, end]) => {
        for (let i = start; i <= end; i++) {
            let gIdx = indexOfValue(charGroup, i)[1];
            if (gIdx !== undefined)
                ranks[gIdx]++;
        }
    });

    if (normalize) return ranks.map((rank, i) => rank / charGroup[i].length);
    return ranks;
}

function indexOfValue(arr, i) {
    let j = 0;
    while (i >= 0 && j >= 0 && j < arr.length) {
        if (arr[j].length > i) return [arr[j][i], j, i];
        else {
            i -= arr[j].length;
            j++;
        }
    }
    return [];
}

class App extends Component {
    state = {
        query: "",
        result: []
    };

    onChange = e => {
        const query = e.target.value;
        const result = fuse.search(hangul.d(query).join(""));
        this.setState({query, result});
    };

    render() {
        return (
            <div className="App">
                <label>
                    나라이름:
                    <input
                        type="text"
                        onChange={this.onChange}
                        value={this.state.query}
                    />
                </label>
                <List data={this.state.result}/>
            </div>
        );
    }
}

class List extends React.PureComponent {

    renderTitle = (text, high) => {
        return text.split('').map((t, i) => {
            return <span style={{backgroundColor: `rgba(255,128,0,${high[i]})`}}>{t}</span>
        })
    };

    render() {
        const {data} = this.props;
        return (
            <ul>
                {data &&
                data.length > 0 &&
                data.map(d => {
                    let h = highlight(d.item.country, d.matches[0].indices, true);
                    return <li key={d.item.country} style={{opacity: 1 - d.score}}>
                        {d.score.toFixed(5)} - {this.renderTitle(d.item.country, h)} - {d.item.h0} - {d.item.h1}
                        {/*{JSON.stringify(h)}*/}
                        {/*{JSON.stringify(d.matches)}*/}
                    </li>;
                })}
                {data && data.length === 0 && <li>결과 없음</li>}
            </ul>
        );
    }
}

export default App;
