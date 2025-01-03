import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Nhân viên',
    path: '/',
    icon: icon('ic-user'),
    // info: (
    //   <Label color="error" variant="inverted">
    //     15
    //   </Label>
    // ),
  },
  {
    title: 'Phòng ban',
    path: '/phong-ban',
    icon: icon('ic-blog'),
    
  },
  {
    title: 'Ngoài giờ cá nhân',
    path: '/ngoai-gio-ca-nhan',
    icon: icon('ic-lock'),
  },
  {
    title: 'Ngoài giờ đơn vị',
    path: '/ngoai-gio-don-vi',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Bảng chấm công',
    path: '/bang-cham-cong',
    icon: icon('ic-cart'),
  },
  {
    title: 'Cài đặt hệ thống',
    path: '/cai-dat-he-thong',
    icon: icon('ic-disabled'),
  },
];
