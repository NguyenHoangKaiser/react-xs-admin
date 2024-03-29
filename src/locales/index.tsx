import type { IntlShape, MessageDescriptor } from 'react-intl';
import { FormattedMessage as IntFormattedMessage, createIntl, useIntl } from 'react-intl';
import en_US from './en_US';
import vi_VN from './vi_VN';

export const localeConfig = {
  'vi-VN': vi_VN,
  'en-US': en_US,
};

export type LocaleType = keyof typeof localeConfig;

export type LocaleId = keyof typeof vi_VN;

interface Props extends MessageDescriptor {
  id: LocaleId;
}

/**
 * Function to format the message, used in the component
 * @param props id: LocaleId - The key of the message
 * @returns \<FormattedMessage id={props.id} /> of react-intl
 */
export const FormatMessage: React.FC<Props> = (props) => {
  return <IntFormattedMessage {...props} id={props.id} />;
};

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: intlFormatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = intlFormatMessage;

  return {
    ...rest,
    formatMessage,
  };
};

let g_intl: IntlShape;

/**
 * Get the current INTL object, you can use it in Node
 * @param locale The language type that needs to be switched
 * @param changeIntl Do you not use g_intl
 * @returns IntlShape
 */
export const getIntl = (locale?: LocaleType, changeIntl?: boolean) => {
  // If the global g_intl exists, and not setintl call
  if (g_intl && !changeIntl && !locale) {
    return g_intl;
  }
  // If you exist in Localeinfo
  if (locale && localeConfig[locale]) {
    return createIntl({
      locale,
      messages: localeConfig[locale],
    });
  }
  // Use vi-vn
  if (localeConfig['vi-VN'])
    return createIntl({
      locale: 'vi-VN',
      messages: localeConfig['vi-VN'],
    });

  // If not yet, return a empty one
  return createIntl({
    locale: 'vi-VN',
    messages: {},
  });
};

/**
 * Get Intl Text function for static use outside of React
 * @param id LocaleId
 * @returns string
 */
export const getIntlText = (props: { id: LocaleId }) => {
  return getIntl().formatMessage(props);
};

/**
 * Set the settings of the global INTL
 * @param locale KEY of Language
 */
export const setIntl = (locale: LocaleType) => {
  g_intl = getIntl(locale, true);
};
