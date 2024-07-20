import BreadCrumb from '@/components/breadcrumb';
import SettingSection from './_components/setting-section';

const breadcrumbItems = [{ title: 'Settings', link: '/dashboard/settings' }];
const SettingPage = () => {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <SettingSection />
    </div>
  );
};
export default SettingPage;
