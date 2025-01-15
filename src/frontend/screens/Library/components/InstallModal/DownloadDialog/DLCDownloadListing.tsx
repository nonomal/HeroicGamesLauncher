import React, { useEffect, useState } from 'react'
import ToggleSwitch from 'frontend/components/UI/ToggleSwitch'
import { useTranslation } from 'react-i18next'
import { DLCInfo } from 'common/types/legendary'

interface Props {
  DLCList: DLCInfo[]
  dlcsToInstall: string[]
  setDlcsToInstall: (dlcs: string[]) => void
}

const DLCDownloadListing: React.FC<Props> = ({
  DLCList,
  setDlcsToInstall,
  dlcsToInstall
}) => {
  const { t } = useTranslation()
  const [installAllDlcs, setInstallAllDlcs] = useState(false)

  if (!DLCList) {
    return null
  }

  useEffect(() => {
    setInstallAllDlcs(dlcsToInstall.length === DLCList.length)
  }, [dlcsToInstall])

  const handleAllDlcs = () => {
    setInstallAllDlcs(!installAllDlcs)
    if (!installAllDlcs) {
      setDlcsToInstall(DLCList.map(({ app_name }) => app_name))
    }

    if (installAllDlcs) {
      setDlcsToInstall([])
    }
  }

  const handleDlcToggle = (index: number) => {
    const { app_name } = DLCList[index]
    const newDlcsToInstall = [...dlcsToInstall]
    if (newDlcsToInstall.includes(app_name)) {
      newDlcsToInstall.splice(newDlcsToInstall.indexOf(app_name), 1)
    } else {
      newDlcsToInstall.push(app_name)
    }
    setDlcsToInstall(newDlcsToInstall)
  }

  return (
    <div className="InstallModal__dlcs">
      <label
        className="InstallModal__toggle toggleWrapper"
        htmlFor="allDlcsSwitch"
      >
        <ToggleSwitch
          htmlId="allDlcsSwitch"
          value={installAllDlcs}
          handleChange={() => handleAllDlcs()}
          title={t('dlc.installDlcs', 'Install all DLCs')}
        />
      </label>
      <div className="InstallModal__dlcsList">
        {DLCList?.map(({ title, app_name }, index) => (
          <label
            key={title}
            className="InstallModal__toggle toggleWrapper"
            title={title}
            htmlFor={`dlcSelector-${index}`}
          >
            <ToggleSwitch
              htmlId={`dlcSelector-${index}`}
              value={dlcsToInstall.includes(app_name)}
              title={title}
              extraClass="InstallModal__toggle--sdl"
              handleChange={() => handleDlcToggle(index)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default DLCDownloadListing
