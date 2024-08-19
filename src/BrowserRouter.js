import {createContext, useEffect, useState} from "react";
import {UNSAFE_DataRouterContext} from "react-router-dom";

function BrowserRouter(props) {
  const RouterContext = createContext();
  
  // 针对history创建context，关联页面路径切换
  const HistoryContext = createContext();
  
  // 初始化路径
  const [path, setPath] = useState(() => {
    // 默认路径
    const {pathname} = window.location;
    return pathname || '/'
  });
  
  // 对popstate事件监听
  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    
    return window.removeEventListener('popstate', handlePopState)
  }, []);
  
  const handlePopState = () => {
    const {pathname} = window.location;
    setPath(pathname);
  }
  
  const push = function (path) {
    setPath(path);
    window.history.pushState({path}, null, path);
  }
  
  const goBack = function (path) {
    window.history.go(-1);
  }
  
  return (
    <RouterContext.Prodiver value={path}>
      <HistoryContext.Provider value={{push, goBack}}>
        {props.children}
      </HistoryContext.Provider>
    </RouterContext.Prodiver>
  )
}

export default BrowserRouter;

export function Route(props) {
  const {component: Component, path: componentPath} = props
  
  return (
    <RouterContext.Consumer>
      {(path) => {
        return componentPath === path ? <Component/> : null;
      }}
    </RouterContext.Consumer>
  )
}
