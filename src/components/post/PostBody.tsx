import SeText from "../smart-editor/SeText";
import SeImage from "../smart-editor/SeImage";
import SeQuote from "../smart-editor/SeQuote";
import SeLine from "../smart-editor/SeLine";

export default function PostBody() {
    return (
        <div className="se-main-container bg-white px-4 py-6">
            <SeQuote>Harry Styles - Aperture</SeQuote>
            <SeText>★★★☆</SeText>

            <SeImage
                src="https://mblogthumb-phinf.pstatic.net/MjAyNjAxMjNfMTQg/MDAxNzY5MTUyNDQ2NTU4.uTIjYKiZn47UPlyuPT7hH0CFwsq5hmPy0nJ6y20Hx7Ig.g1OFsQG7y7i2Fo5woRa9yn9OpXgsHNAh2ReAlRW5MJgg.PNG/900%EF%BC%BF0ce40b128c7198df5a460d1be9f9ffaf.1000x1000x1.png?type=w800"
                caption="Aperture"
                width={900}
                height={900}
            />

            <SeText>​</SeText>
            <SeText>
                원디랙션의 멤버 해리 스타일스가 3집 [Harry's House] 이후 4년 만에 4집 [Kiss All The Time. Disco, Occasionally.]를 발매할 예정이다. 앨범 발매일은 3월 6일이며, 이번 곡을 포함한 12곡이 수록될 예정이다.
            </SeText>
            <SeText>​</SeText>
            <SeText>
                리드 싱글 Aperture 은 5분이 넘는 팝스타 치고 꽤 긴 러닝타임을 가지고 있는 트랙이다. 저지 클럽을 기반으로 하고 있는 몽환적이고 부드럽게 선선한 공기감의 인디×전자음을 겸비한 트랙이다. 뭔가 이번 앨범 되게 아트팝적일것 같은 느낌이 나는데, 심심한 팝 씬에 어떤 바람을 불어줄지 기대가 된다.
            </SeText>

            <SeLine />

            <SeQuote>James Blake - Death of Love</SeQuote>
            <SeText>★★★☆</SeText>

            <SeImage
                src="https://mblogthumb-phinf.pstatic.net/MjAyNjAxMjNfMjE3/MDAxNzY5MTUyNDQ2MzI4.unxSirx-FjrTY9quJgDrddhuLrt4n-NQduMXEcLvqekg.UL_hN91ptJdYyf7cdLJvcSQGVznA9CnHmC78hR5Mgk4g.PNG/122399c774aef30276c0538177bf610f.895x895x1.png?type=w800"
                caption="Death of Love / Trying Times"
                width={895}
                height={895}
            />

            <SeText>​</SeText>
            <SeText>
                제임스 블레이크도 올해 새 앨범 발매를 알렸다. 앨범명은 [Trying Times]이며, 발매일은 3월 13일이다. 이번 신곡을 포함한 13곡이 수록될 예정이다.
            </SeText>
            <SeText>​</SeText>
            <SeText>
                전작 [Playing Robot Into Heaven] 은 되게 심오한 느낌이 강했는데, 이번 앨범도 그 기조를 이어 오려는 듯하지만, 본인 목소리가 많이 들어있는, 기계보다는 감정에 대한 이야기를 많이 할 것 같다는 예상을 해본다. 리드 싱글 Death of Love는 제임스 블레이크 특유의 전자음과 보컬에 더불어 극적인 분위기를 메인으로 연출하는 트랙이다.
            </SeText>
        </div>
    );
}
