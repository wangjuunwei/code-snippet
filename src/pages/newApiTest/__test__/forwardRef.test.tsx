import React from "react";
import {mount} from 'enzyme';
import ForwardRef from '../forwardRef'


describe('forwardRef 组件测试', () => {
    it('渲染正常', function () {
        const componentWrapper = mount(<ForwardRef/>)
        expect(componentWrapper.html()).toMatchSnapshot();
    });
})