// import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white dark:bg-neutral-800  text-slate-900  dark:text-slate-50 border-t border-gray-100 dark:border-neutral-700 pt-20 lg:pt-[120px] pb-10 lg:pb-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-2/3 lg:w-3/12 px-4">
              <div className="w-full mb-10">
                <div className="fill-[#23262F] dark:fill-[#F4F5F6]">
                  <svg height="70" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.301061 23.4158C0.850018 23.8479 1.89456 24.2895 2.77686 24.4515C3.57803 24.6043 4.91932 24.6043 5.81961 24.4423L6.17094 24.3795L6.09897 24.9102C6.05383 25.1984 6.03584 25.6936 6.04468 25.9995C6.06268 26.6479 6.08982 26.6302 4.96415 26.7379C2.8037 26.927 1.30962 26.0807 0.174801 24.0373C-0.121942 23.4881 -0.229903 23.1459 -0.0947988 23.1459C-0.0679609 23.1459 0.111975 23.2721 0.301061 23.4158Z" />
                    <path d="M13.9491 14.9446C14.147 15.1428 15.9027 15.944 16.6859 16.2142C17.154 16.3673 17.9461 16.5561 18.4414 16.6372C18.9366 16.7092 18.929 16.7196 19.5399 16.8083C20.8989 17.005 20.6829 19.1847 20.7192 24.0643L20.7458 28.9979H19.6384H18.5225L18.3782 28.3675C18.0001 26.7831 17.19 25.8109 15.9924 25.4867C15.5514 25.3788 15.5334 25.3156 15.8036 24.9466C16.0555 24.5956 16.0647 23.9923 15.8128 23.5962L15.6234 23.2988L15.5605 23.7856C15.5243 24.0552 15.4431 24.3797 15.3715 24.5056C15.2184 24.8112 14.7322 25.2348 14.3632 25.3879C14.0662 25.5139 13.9942 25.5929 14.129 25.9009C14.2034 26.0704 14.2244 26.0805 14.7322 26.0088C15.4065 25.9134 16.2175 26.0988 16.6676 26.4501C17.0729 26.756 17.4599 27.3864 17.6762 28.0882C17.7969 28.4779 17.9467 29.0006 17.9314 29C17.9198 28.9991 16.6023 28.9979 13.5977 28.9979C9.86176 28.9979 9.27682 28.9796 8.8895 28.8445C6.99895 28.2053 6.08982 26.0897 6.94527 24.2985C7.35913 23.4251 8.57446 21.7596 9.60985 20.6342C11.0234 19.1127 11.5184 18.2576 11.8874 16.7272L12.0494 16.016L12.6349 15.6381C12.9588 15.4219 13.301 15.1605 13.3909 15.0617C13.5709 14.8546 13.8051 14.8098 13.9491 14.9446Z" />
                    <path d="M19.5282 6.37955C19.5282 6.96785 20.0055 7.4448 20.5938 7.4448C20.8768 7.4448 21.1333 7.33443 21.3245 7.1545C21.3255 7.17642 21.3258 7.19811 21.3258 7.22007C21.3258 8.15939 20.5639 8.92122 19.6249 8.92122C18.6856 8.92122 17.9238 8.15939 17.9238 7.22007C17.9238 6.28104 18.6856 5.51921 19.6249 5.51921C19.7286 5.51921 19.8305 5.52867 19.9293 5.54666C19.6853 5.74185 19.5282 6.04225 19.5282 6.37955ZM7.44935 10.4074L7.52102 11.0286C7.61129 11.7758 7.82722 12.2976 8.25022 12.7658C9.11483 13.7203 10.8883 13.9902 11.8514 13.315C12.1576 13.0991 12.1576 13.1802 11.8605 13.5761C11.5635 13.9725 10.8248 14.3864 10.285 14.4587C9.73576 14.5398 9.02455 14.3321 8.4393 13.9454C7.62929 13.3961 7.18799 12.1271 7.37707 10.8844L7.44935 10.4074ZM26.6424 2.09798C26.5345 2.35903 26.4445 2.43101 26.2106 2.467C26.0483 2.51732 25.3914 2.64694 24.743 2.79119C23.8821 2.98241 23.2666 3.09708 22.4655 3.13306C21.1962 3.19619 20.854 3.13306 19.2968 2.61125C17.6218 2.044 16.6676 1.87291 15.11 1.87291C13.5708 1.87291 12.6349 2.05315 11.5 2.57496C8.67353 3.87143 6.69301 6.77934 6.32368 10.1823C6.17974 11.533 6.39596 13.0363 6.88179 13.9814C7.16999 14.5483 7.82783 15.1952 8.39417 15.4669C8.758 15.641 9.39754 15.7228 9.88886 15.7179C11.6894 15.7179 12.9139 15.0887 13.526 13.9002C13.913 13.1354 14.0301 12.5321 14.0301 11.2445C14.0301 10.4705 14.057 10.0835 14.1109 10.2091C14.4803 11.1542 14.5431 12.802 14.2552 13.6484C14.1561 13.9363 14.0753 14.2245 14.0753 14.2876C14.0753 14.4315 16.0646 15.4035 16.9829 15.71C18.2342 16.1238 19.1165 16.2413 20.5569 16.187C21.736 16.1513 21.9342 16.1238 22.6722 15.8628C26.0846 14.6386 28.8925 11.6879 29.3973 7.7065C29.5449 6.54332 29.5412 5.03278 29.4064 4.58233C29.3161 4.28558 29.3253 4.23188 29.5147 4.06079C29.8386 3.75432 30.0097 3.32213 30.0097 2.80919C30.0097 2.0077 29.6315 1.41361 28.9383 1.12571C28.0651 0.765534 27.012 1.20684 26.6424 2.09798Z" />
                  </svg>
                </div>
                <Link href={'/'}>
                  <a className="inline-block max-w-[160px] mb-6" rel="nofollow noopener" target="_blank">
                    <h6 className="m-t text-4xl font font-extrabold tracking-tight text-slate-900  dark:text-slate-50  sm:text-4xl">
                      Fafty
                    </h6>
                  </a>
                </Link>
                <p className="text-base text-body-color mb-7">
                  Sed ut perspiciatis undmnis is iste natus error sit amet
                  voluptatem totam rem aperiam.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/12 px-4">
              <div className="w-full mb-10">
                <h4 className="text-dark text-lg font-semibold mb-9">Company</h4>
                <ul>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Referral Program
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Press Kit
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Legal
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/12 px-4">
              <div className="w-full mb-10">
                <h4 className="text-dark text-lg font-semibold mb-9">Products</h4>
                <ul>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Products Overview
                    </a>
                  </li>
                  
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Release Notes
                    </a>
                  </li>
                  {/* Link to land page for subscribe user to newsletter. */}
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Share your ideas
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Taxes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/12 px-4">
              <div className="w-full mb-10">
                <h4 className="text-dark text-lg font-semibold mb-9">Quick Links</h4>
                <ul>
                  <li>
                    <Link href={'/blog/newsletter'}>
                      <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                        Newsletter Signup
                      </a>
                    </Link>
                  </li>  
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      System Status
                    </a>
                  </li>
                  <li>
                    <a className="inline-block text-base text-body-color hover:text-primary leading-loose mb-2">
                      Report Abuse
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-3/12 px-4">
              <div className="w-full mb-10">
                <h4 className="text-dark text-lg font-semibold mb-9">Follow Us On</h4>
                <div className="flex items-center mb-6">
                  <a
                    className="
                     w-8
                     h-8
                     flex
                     items-center
                     justify-center
                     rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-white hover:bg-primary hover:border-primary
                     mr-3
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                  >
                    <svg
                      width="8"
                      height="16"
                      viewBox="0 0 8 16"
                      className="fill-current"
                    >
                      <path
                        d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z"
                      />
                    </svg>
                  </a>
                  <a
                    className="
                     w-8
                     h-8
                     flex
                     items-center
                     justify-center
                     rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-white hover:bg-primary hover:border-primary
                     mr-3
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                  >
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      className="fill-current"
                    >
                      <path
                        d="M14.2194 2.06654L15.2 0.939335C15.4839 0.634051 15.5613 0.399217 15.5871 0.2818C14.8129 0.704501 14.0903 0.845401 13.6258 0.845401H13.4452L13.3419 0.751468C12.7226 0.258317 11.9484 0 11.1226 0C9.31613 0 7.89677 1.36204 7.89677 2.93542C7.89677 3.02935 7.89677 3.17025 7.92258 3.26419L8 3.73386L7.45806 3.71037C4.15484 3.61644 1.44516 1.03327 1.00645 0.587084C0.283871 1.76125 0.696774 2.88845 1.13548 3.59296L2.0129 4.90802L0.619355 4.20352C0.645161 5.18982 1.05806 5.96477 1.85806 6.52838L2.55484 6.99804L1.85806 7.25636C2.29677 8.45401 3.27742 8.94716 4 9.13503L4.95484 9.36986L4.05161 9.93346C2.60645 10.8728 0.8 10.8024 0 10.7319C1.62581 11.7652 3.56129 12 4.90323 12C5.90968 12 6.65806 11.9061 6.83871 11.8356C14.0645 10.2857 14.4 4.41487 14.4 3.2407V3.07632L14.5548 2.98239C15.4323 2.23092 15.7935 1.8317 16 1.59687C15.9226 1.62035 15.8194 1.66732 15.7161 1.6908L14.2194 2.06654Z"
                      />
                    </svg>
                  </a>
                  <a
                    className="w-8 h-8 flex items-center justify-center rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-white hover:bg-primary hover:border-primary
                     mr-3
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                  >
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      className="fill-current"
                    >
                      <path
                        d="M15.6645 1.88018C15.4839 1.13364 14.9419 0.552995 14.2452 0.359447C13.0065 6.59222e-08 8 0 8 0C8 0 2.99355 6.59222e-08 1.75484 0.359447C1.05806 0.552995 0.516129 1.13364 0.335484 1.88018C0 3.23502 0 6 0 6C0 6 0 8.79263 0.335484 10.1198C0.516129 10.8664 1.05806 11.447 1.75484 11.6406C2.99355 12 8 12 8 12C8 12 13.0065 12 14.2452 11.6406C14.9419 11.447 15.4839 10.8664 15.6645 10.1198C16 8.79263 16 6 16 6C16 6 16 3.23502 15.6645 1.88018ZM6.4 8.57143V3.42857L10.5548 6L6.4 8.57143Z"
                      />
                    </svg>
                  </a>
                  <a
                    className="
                     w-8
                     h-8
                     flex
                     items-center
                     justify-center
                     rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-white hover:bg-primary hover:border-primary
                     mr-3
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="fill-current"
                    >
                      <path
                        d="M13.0214 0H1.02084C0.453707 0 0 0.451613 0 1.01613V12.9839C0 13.5258 0.453707 14 1.02084 14H12.976C13.5432 14 13.9969 13.5484 13.9969 12.9839V0.993548C14.0422 0.451613 13.5885 0 13.0214 0ZM4.15142 11.9H2.08705V5.23871H4.15142V11.9ZM3.10789 4.3129C2.42733 4.3129 1.90557 3.77097 1.90557 3.11613C1.90557 2.46129 2.45002 1.91935 3.10789 1.91935C3.76577 1.91935 4.31022 2.46129 4.31022 3.11613C4.31022 3.77097 3.81114 4.3129 3.10789 4.3129ZM11.9779 11.9H9.9135V8.67097C9.9135 7.90323 9.89082 6.8871 8.82461 6.8871C7.73571 6.8871 7.57691 7.74516 7.57691 8.60323V11.9H5.51254V5.23871H7.53154V6.16452H7.55423C7.84914 5.62258 8.50701 5.08065 9.52785 5.08065C11.6376 5.08065 12.0232 6.43548 12.0232 8.2871V11.9H11.9779Z"
                      />
                    </svg>
                  </a>
                </div>
                <p className="text-base text-body-color">&copy; 2022 Fafty</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="absolute left-0 bottom-0 z-[-1]">
            <svg
              width="217"
              height="229"
              viewBox="0 0 217 229"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
                fill="url(#paint0_linear_1179_5)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1179_5"
                  x1="76.5"
                  y1="281"
                  x2="76.5"
                  y2="1.22829e-05"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3056D3" stopOpacity="0.08" />
                  <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute top-10 right-10 z-[-1]">
            <svg
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
                fill="url(#paint0_linear_1179_4)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1179_4"
                  x1="-1.63917e-06"
                  y1="37.5"
                  x2="75"
                  y2="37.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#13C296" stopOpacity="0.31" />
                  <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </footer>
    </>
  )
}

export default Footer;