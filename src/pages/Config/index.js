import { Form } from "../../components/commons/Form";
import axios from "axios";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setConfig, setOpenLoading } from "../../store/root";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Cta from "../../components/commons/Cta";
import Box from "../../components/Box";
import { useEffect } from "react";

export default function Config() {
  const dispatch = useDispatch();

  // STATE
  const { config } = useSelector(state => state.root);

  // METHOD
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + '/options';
      const { data } = await axios.post(urlApi, config);

      setConfig(data);
    } catch (error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }

  useEffect(() => {
    document.title = 'Cấu hình hệ thống - ' + config.site_title;
  }, [dispatch, config]);

  // CLASS
  const cls = {
    wrap: 'w-full max-w-2xl mx-auto',
    title: 'mb-10 text-2xl font-semi-bold',
    body: 'w-full',
    groupDimInput: 'grid grid-cols-7 mb-3',
    groupLabelInput: 'col-span-3',
    grid2: 'grid grid-cols-7 col-span-4',
    textInputGroup: 'mb-0 col-span-7 text-center',
    dimInputGroup: 'mb-0 col-span-3 text-center',
    dimInput: 'text-center',
    xIcon: 'flex items-center justify-center',
    cta: 'text-right',
  };
    
  // RENDER
  return (
    <div className={cls.wrap} data-config-page>
      <Box title="Cấu hình hệ thống" boxStyle="blue">
        <form onSubmit={handleEventSubmit}>
          <div className={cls.groupDimInput}>
            <Form.Label text='Tên trang' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input
                name="site_title"
                value={config?.site_title || ''}
                customClassGroup={cls.textInputGroup}
                onChange={(e) => dispatch(setConfig({ ...config, site_title: e.target.value }))}
              />
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Kích thước ảnh album' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input
                name="atd_width"
                value={config?.atd_width || 0}
                customClassGroup={cls.dimInputGroup}
                customClassInput={cls.dimInput}
                onChange={(e) => dispatch(setConfig({ ...config, atd_width: e.target.value }))}
              />
              <span className={cls.xIcon}><FontAwesomeIcon icon={faX}/></span>
              <Form.Input
                name="atd_height"
                value={config?.atd_height || 0}
                customClassGroup={cls.dimInputGroup}
                customClassInput={cls.dimInput}
                onChange={(e) => dispatch(setConfig({ ...config, atd_height: e.target.value }))}
              />
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Kích thước ảnh thumbnail' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input
                name="itd_width"
                value={config?.itd_width || 0}
                customClassGroup={cls.dimInputGroup}
                customClassInput={cls.dimInput}
                onChange={(e) => dispatch(setConfig({ ...config, itd_width: e.target.value }))}
              />
              <span className={cls.xIcon}><FontAwesomeIcon icon={faX}/></span>
              <Form.Input
                name="itd_height"
                value={config?.itd_height || 0}
                customClassGroup={cls.dimInputGroup}
                customClassInput={cls.dimInput}
                onChange={(e) => dispatch(setConfig({ ...config, itd_height: e.target.value }))}
              />
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Kích thước ảnh xem trực tiếp' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input
                name="ipd_width"
                value={config?.ipd_width || 0}
                customClassGroup={cls.dimInputGroup}
                customClassInput={cls.dimInput}
                onChange={(e) => dispatch(setConfig({ ...config, ipd_width: e.target.value }))}
              />
              <span className={cls.xIcon}><FontAwesomeIcon icon={faX}/></span>
              <Form.Input
                name="ipd_height"
                value={config?.ipd_height || 0}
                customClassGroup={cls.dimInputGroup}
                customClassInput={cls.dimInput}
                onChange={(e) => dispatch(setConfig({ ...config, ipd_height: e.target.value }))}
              />
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Chất lượng hình ảnh xem trực tiếp' subText='(1 - 100)' customClass={cls.groupLabelInput}>
            </Form.Label>
            <div className={cls.grid2}>
              <Form.Input
                name="iop"
                value={config?.iop || 0}
                customClassGroup={cls.textInputGroup}
                onChange={(e) => dispatch(setConfig({ ...config, iop: e.target.value }))}
              />
            </div>
          </div>
          <div className={cls.cta}>
            <Cta type="submit">Đồng ý</Cta>
          </div>
        </form>
      </Box>
    </div>
  )
}
