import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import dotenv from 'dotenv';
import { RootState } from '../../redux/modules/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getFormatedItems } from '../../modules/converters';
import { ItemHandler } from '../../redux/modules/Items';
import { FaFilter } from 'react-icons/fa';
import './style/FilterBtn.scss';
import { TypeHandler } from '../../redux/modules/SearchType';

dotenv.config();

interface Props extends RouteComponentProps{
  title?: string
}

const FilterBtn: React.FC<Props> = ({history, title}) => {

  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id } = userInfoState;
  const typeState = useSelector((state: RootState) => state.SearchTypeReducer);
  const { searchType } = typeState;
  const dispatch = useDispatch();
  const filterTooltip = useRef<HTMLDivElement>(null);
  

  const handleFilterPopup = () => {
    const visibility = filterTooltip?.current?.style.visibility;

    if(filterTooltip.current !== null) {
      if (visibility === 'hidden') {
        filterTooltip.current.style.visibility = 'visible';
      } else {
        filterTooltip.current.style.visibility = 'hidden';
      }
    }
  };

  window.onpopstate = function(event: any) {
    if(searchType === 'buyer') {
      setsearchType('seller');
    }
    else {
      setsearchType('buyer');
    }
  };
  useEffect(() => {
    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/${searchType}`,
      {userId: id },
      {withCredentials: true})
      .then(res => {
        dispatch(ItemHandler(getFormatedItems(res.data.items)));
        console.log(res.data.items);
        // history.push('/ko/mypage/auction');
        console.log('buyer 응답');
      });
    console.log('왜');
  }, [searchType]);

  const handlefilter = (props: string) => {
    //1.setSearchType으로 서버에 요청 분기(요청할 때 필요한것:userId => 리덕스에 있음)
    //2.응답받아서 리덕스에 저장하기
    if(props === 'buyer') {
      axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/buyer`,
        { offset: 0, userId: id },
        {withCredentials: true})
        .then(res => {
          dispatch(ItemHandler(getFormatedItems(res.data.items)));
          console.log(res.data.items);
          history.push('/ko/mypage/auction', {
            title: '입찰'
          });
          console.log('buyer 응답');
        });
    }
    else {
      axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/seller`,
        { offset: 0, userId: id },
        {withCredentials: true})
        .then(res => {
          dispatch(ItemHandler(getFormatedItems(res.data.items)));
          console.log(res.data.items);
          history.push('/ko/mypage/auction', {
            title: '판매'
          });
          console.log('seller 응답');
        });
    }
  };

  return (
    <div className='icon'>
      <FaFilter xmlns="http://www.w3.org/2000/svg" className='filter-button' onClick={handleFilterPopup}/>
      <div className="filter-tooltip" ref={filterTooltip}>
        <div className='radio-button'>
          <div className="buyer">
            <label className="tooltip-container">
              <input name='radio' type="radio" value="buyer" onClick={()=>handlefilter('buyer')} onChange={() => dispatch(TypeHandler('buyer'))} checked={searchType === 'buyer' ? true : false} />
              <span className="checkmark"></span>
                    입찰
            </label>
          </div>
          <div className="seller">
            <label className="tooltip-container">
              <input name='radio' type="radio" value="seller" onClick={()=>handlefilter('seller')} onChange={() => dispatch(TypeHandler('seller'))} checked={searchType === 'seller' ? true : false} />
              <span className="checkmark"></span>
                    판매
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FilterBtn);