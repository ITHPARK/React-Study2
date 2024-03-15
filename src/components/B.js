import React, { useCallback, } from'react';


/*
    React.memo?

    React는 먼저 컴포넌트를 렌더링 한 뒤, 이전에 렌더링 된 결과와 비교하여 DOM 업데이트를 결정한다.
    이 과정에서 컴포넌트가 React.memo()로 둘러 쌓여 있다면, React는 컴포넌트를 렌더링하고 결과를 메모이징한다.
    그리고 다은 렌더링이 일어날 때 렌더링 하는 컴포넌트의 props가 같다면, React는 메모이징 된 내용을 재사용 한다.

    memoization? 
    
    주어진 입력값에 대한 결과를 저장함으로써 같은 입력값에 대해 함수가 한 번만 실행되는것을 보장.


    기능의 재사용성과 최적화를 위해서 A.js와 다르게 B.js에서는 기능별로 컴포넌트를 나눈다
    그런데 message 컴포넌트의 값이 바뀌면 상관없는 컴포넌트까지 다 렌더링이 다시 되고 있어서 
    React.memo를 사용하여 처리해줘야한다.

    쉽게 말해서 변경이 일어나면 변경 후의 상태를 저장하고 다음 변경이 일어났을 때 이전의 저장값과 비교해서 
    내용이 같으면 이전에 저장된 내용을 다시 사용한다.


    React.memo는 디폴트값은 전체 비교이지만 커스터마이징이 가능하다.

    예시코드)
    React.memo(Component, [compareFinction(prevProps, nextProps)])
    function compareFunction(prevProps, nextProps) {
        return(
            prevProps.a === nextProps.a &&
            prevProps.b === nextProps.b 
        )
    }



    React.memo가 Props를 비교하는 방법은?

    React.memo는 props 혹은 props의 객체를 비교할 때 얕은(shallow) 비교를 한다.


    

    

    

*/

const Message = React.memo(({message}) => {
    return(
        <p>
            {message}
        </p>
    )
})

const ListItem = React.memo(({post}) => {
    return(
        <li key = {post.id}>
            <p>{post.title}</p>
        </li>
    )
})

const List = React.memo(({posts, testFunction}) => {

    return(
        <ul>
            {posts.map(post => (
                <ListItem key={post.id} post={post}/>
            ))}
        </ul>
    )
})



const B = ({message, posts}) => {

    const testFunction = useCallback (() => {}, [])

    //props로 내려준 자녀 컴포넌트도 같이 렌더링 됨

    //useCallback을 활용함으로써 state 혹은 props가 변하지 않는다면 함수는 새로 생성되지 않는다.
    //렌더링이 되더라도 계산기 함수가 초기화되는 것을 막을 수 있다.
    //함수내에서 참조하는 state, props가 잇다면 의존성 배열에 추가하면 된다.

    return (
        <div>
            <h1>B component</h1>
            <Message message = {message}/>
            <List posts={posts} testFuntion={testFunction(10)}/>
        </div>
    )

}

export default B