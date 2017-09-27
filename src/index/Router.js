/**
 * Created by Administrator on 2017/9/27.
 */
import  React ,{Component} from 'react';
//引入路由
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


//配置路由
export  default  class RouterWarp extends  Component {
    render () {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/user/list" compontent={}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
