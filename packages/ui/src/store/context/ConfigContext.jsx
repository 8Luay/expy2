import platformsettingsApi from '@/api/platformsettings'
import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'

// TESTING ONLY OVERRIDE
// ========== SIMPLE MODE OVERRIDE ==========
// Set to 'enterprise' or 'cloud' to force that mode
// Set to null to use the actual mode from the backend
const MODE_OVERRIDE = 'cloud'
// =========================================
// END TESTING ONLY OVERRIDE

const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({})
    const [loading, setLoading] = useState(true)
    // TESTING ONLY: Simple mode override
    // const [isEnterpriseLicensed, setEnterpriseLicensed] = useState(false)
    // const [isCloud, setCloudLicensed] = useState(false)
    // const [isOpenSource, setOpenSource] = useState(false)
    const [isEnterpriseLicensed, setEnterpriseLicensed] = useState(MODE_OVERRIDE === 'enterprise')
    const [isCloud, setCloudLicensed] = useState(MODE_OVERRIDE === 'cloud')
    const [isOpenSource, setOpenSource] = useState(!MODE_OVERRIDE)
    // END TESTING ONLY

    useEffect(() => {
        const userSettings = platformsettingsApi.getSettings()
        Promise.all([userSettings])
            .then(([currentSettingsData]) => {
                const finalData = {
                    ...currentSettingsData.data
                }

                // TESTING ONLY OVERRIDE
                // Apply mode override if set
                if (MODE_OVERRIDE === 'enterprise' || MODE_OVERRIDE === 'cloud') {
                    console.log(`🔧 MODE_OVERRIDE: Expy AI is in Public ${MODE_OVERRIDE} Beta Mode`)
                    finalData.PLATFORM_TYPE = MODE_OVERRIDE
                }
                // END TESTING ONLY OVERRIDE

                setConfig(finalData)
                if (finalData.PLATFORM_TYPE) {
                    if (finalData.PLATFORM_TYPE === 'enterprise') {
                        setEnterpriseLicensed(true)
                        setCloudLicensed(false)
                        setOpenSource(false)
                    } else if (finalData.PLATFORM_TYPE === 'cloud') {
                        setCloudLicensed(true)
                        setEnterpriseLicensed(false)
                        setOpenSource(false)
                    } else {
                        setOpenSource(true)
                        setEnterpriseLicensed(false)
                        setCloudLicensed(false)
                    }
                }

                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setLoading(false)
            })
    }, [])

    return (
        <ConfigContext.Provider value={{ config, loading, isEnterpriseLicensed, isCloud, isOpenSource }}>{children}</ConfigContext.Provider>
    )
}

export const useConfig = () => useContext(ConfigContext)

ConfigProvider.propTypes = {
    children: PropTypes.any
}
